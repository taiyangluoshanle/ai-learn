"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientIfConfigured, isSupabaseConfigured } from "@/lib/supabase/client";
import { useProgress } from "@/components/providers/ProgressProvider";

export const AuthButton = () => {
  const router = useRouter();
  const { isLoggedIn, user, syncing } = useProgress();
  const supabase = createClientIfConfigured();

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!isSupabaseConfigured()) {
    return (
      <Link
        href="/login"
        className="text-sm text-white/70 hover:text-white"
        title="配置 Supabase 后可登录"
      >
        登录
      </Link>
    );
  }

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="rounded border border-white/30 px-3 py-1.5 text-sm hover:bg-white/10"
      >
        登录
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {syncing && (
        <span className="text-xs text-white/50" aria-live="polite">
          同步中…
        </span>
      )}
      <span
        className="hidden max-w-[120px] truncate text-xs text-white/70 sm:inline"
        title={user?.email ?? ""}
      >
        {user?.email}
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded border border-white/30 px-3 py-1.5 text-sm hover:bg-white/10"
        aria-label="退出登录"
      >
        退出
      </button>
    </div>
  );
};
