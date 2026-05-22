"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClientIfConfigured } from "@/lib/supabase/client";
import {
  defaultProgress,
  loadProgress,
  saveProgress,
  calcPathProgress,
} from "@/lib/progress-storage";
import {
  fetchRemoteProgress,
  mergeProgress,
  upsertRemoteProgress,
} from "@/lib/progress-remote";
import type { ProgressState } from "@/lib/types";

type ProgressContextValue = {
  progress: ProgressState;
  loading: boolean;
  syncing: boolean;
  isLoggedIn: boolean;
  user: User | null;
  updateProgress: (updater: (prev: ProgressState) => ProgressState) => void;
  calcPathProgress: (lessonSlugs: string[]) => number;
  refreshProgress: () => Promise<void>;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const supabase = useMemo(() => createClientIfConfigured(), []);

  const syncToRemote = useCallback(
    async (state: ProgressState, uid: string) => {
      if (!supabase) return;
      setSyncing(true);
      await upsertRemoteProgress(supabase, uid, state);
      setSyncing(false);
    },
    [supabase]
  );

  const hydrate = useCallback(
    async (currentUser: User | null) => {
      const local = loadProgress();
      setProgress(local);

      if (!supabase || !currentUser) {
        setLoading(false);
        return;
      }

      const remote = await fetchRemoteProgress(supabase, currentUser.id);
      if (remote) {
        const merged = mergeProgress(local, remote);
        setProgress(merged);
        saveProgress(merged);
        await upsertRemoteProgress(supabase, currentUser.id, merged);
      } else {
        await upsertRemoteProgress(supabase, currentUser.id, local);
      }

      setLoading(false);
    },
    [supabase]
  );

  const refreshProgress = useCallback(async () => {
    if (!supabase) {
      setProgress(loadProgress());
      return;
    }
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    setUser(currentUser);
    await hydrate(currentUser);
  }, [supabase, hydrate]);

  useEffect(() => {
    if (!supabase) {
      setProgress(loadProgress());
      setLoading(false);
      return;
    }

    const init = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
      await hydrate(currentUser);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      hydrate(nextUser);
    });

    return () => subscription.unsubscribe();
  }, [supabase, hydrate]);

  const updateProgress = useCallback(
    (updater: (prev: ProgressState) => ProgressState) => {
      setProgress((prev) => {
        const next = updater(prev);
        saveProgress(next);
        if (user && supabase) {
          syncToRemote(next, user.id);
        }
        return next;
      });
    },
    [user, supabase, syncToRemote]
  );

  const value = useMemo(
    () => ({
      progress,
      loading,
      syncing,
      isLoggedIn: Boolean(user),
      user,
      updateProgress,
      calcPathProgress: (lessonSlugs: string[]) =>
        calcPathProgress(lessonSlugs, progress.completedLessons),
      refreshProgress,
    }),
    [progress, loading, syncing, user, updateProgress, refreshProgress]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress 必须在 ProgressProvider 内使用");
  }
  return ctx;
};
