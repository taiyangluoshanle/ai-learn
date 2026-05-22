import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProgressState } from "./types";

export type UserProgressRow = {
  user_id: string;
  completed_lessons: string[];
  completed_tasks: Record<string, string[]>;
  last_lesson_slug: string | null;
  updated_at: string;
};

export const rowToProgress = (row: UserProgressRow): ProgressState => ({
  completedLessons: row.completed_lessons ?? [],
  completedTasks: row.completed_tasks ?? {},
  lastLessonSlug: row.last_lesson_slug,
});

export const progressToRow = (userId: string, state: ProgressState) => ({
  user_id: userId,
  completed_lessons: state.completedLessons,
  completed_tasks: state.completedTasks,
  last_lesson_slug: state.lastLessonSlug,
  updated_at: new Date().toISOString(),
});

/** 合并本地与云端：取并集，任务按课节合并 */
export const mergeProgress = (
  local: ProgressState,
  remote: ProgressState
): ProgressState => {
  const completedLessons = [
    ...new Set([...local.completedLessons, ...remote.completedLessons]),
  ];

  const completedTasks = { ...remote.completedTasks };
  for (const [slug, tasks] of Object.entries(local.completedTasks)) {
    completedTasks[slug] = [
      ...new Set([...(completedTasks[slug] ?? []), ...tasks]),
    ];
  }

  return {
    completedLessons,
    completedTasks,
    lastLessonSlug: remote.lastLessonSlug ?? local.lastLessonSlug,
  };
};

export const fetchRemoteProgress = async (
  supabase: SupabaseClient,
  userId: string
): Promise<ProgressState | null> => {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[Supabase] fetch progress:", error.message);
    return null;
  }

  if (!data) return null;
  return rowToProgress(data as UserProgressRow);
};

export const upsertRemoteProgress = async (
  supabase: SupabaseClient,
  userId: string,
  state: ProgressState
): Promise<boolean> => {
  const { error } = await supabase.from("user_progress").upsert(
    progressToRow(userId, state),
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("[Supabase] upsert progress:", error.message);
    return false;
  }

  return true;
};
