"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProgress } from "@/components/providers/ProgressProvider";

type ContinueLearningProps = {
  pathId: string;
  pathTitle: string;
  lessonSlugs: string[];
  firstLessonSlug: string;
  lessonsMeta: { slug: string; title: string }[];
};

export const ContinueLearning = ({
  pathId,
  pathTitle,
  lessonSlugs,
  firstLessonSlug,
  lessonsMeta,
}: ContinueLearningProps) => {
  const { progress, calcPathProgress, loading, isLoggedIn, syncing } =
    useProgress();

  const { percent, continueSlug, continueTitle } = useMemo(() => {
    const pct = calcPathProgress(lessonSlugs);
    const slug =
      progress.lastLessonSlug &&
      lessonSlugs.includes(progress.lastLessonSlug)
        ? progress.lastLessonSlug
        : lessonSlugs.find((s) => !progress.completedLessons.includes(s)) ??
          firstLessonSlug;

    return {
      percent: pct,
      continueSlug: slug,
      continueTitle:
        lessonsMeta.find((l) => l.slug === slug)?.title ?? "开始第一课",
    };
  }, [progress, lessonSlugs, firstLessonSlug, lessonsMeta, calcPathProgress]);

  return (
    <div className="rounded-xl border border-[var(--cc-border)] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cc-green)]">
          继续学习
        </p>
        {isLoggedIn && (
          <span className="text-xs text-gray-400">
            {syncing ? "同步 Supabase…" : "已云端同步"}
          </span>
        )}
      </div>
      <h2 className="mt-1 text-xl font-bold">{pathTitle}</h2>
      <p className="mt-1 text-gray-600">
        {loading ? "加载进度…" : continueTitle}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-[var(--cc-green)] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm font-medium">{percent}%</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/learn/${continueSlug}`}
          className="rounded bg-[var(--cc-yellow)] px-6 py-2.5 text-sm font-bold text-[var(--cc-navy)] hover:opacity-90"
        >
          继续课程
        </Link>
        <Link
          href={`/paths/${pathId}`}
          className="rounded border border-[var(--cc-border)] px-6 py-2.5 text-sm font-medium hover:bg-gray-50"
        >
          查看路径
        </Link>
        {!isLoggedIn && (
          <Link
            href="/login"
            className="rounded border border-[var(--cc-green)] px-6 py-2.5 text-sm font-medium text-[var(--cc-green)] hover:bg-green-50"
          >
            登录同步进度
          </Link>
        )}
      </div>
    </div>
  );
};
