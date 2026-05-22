"use client";

import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { LessonMarkdown } from "./LessonMarkdown";
import { CodeWorkspace } from "./CodeWorkspace";
import { LessonTasks } from "./LessonTasks";

type LessonWorkspaceProps = {
  lesson: Lesson;
  pathTitle: string;
  prevSlug?: string;
  nextSlug?: string;
  lessonIndex: number;
  totalLessons: number;
};

export const LessonWorkspace = ({
  lesson,
  pathTitle,
  prevSlug,
  nextSlug,
  lessonIndex,
  totalLessons,
}: LessonWorkspaceProps) => {
  const progressPercent = Math.round((lessonIndex / totalLessons) * 100);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 flex-col">
      {/* Lesson top bar — Codecademy-style */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--cc-border)] bg-white px-4 py-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-gray-500">{pathTitle}</p>
          <h1 className="truncate text-sm font-bold md:text-base">{lesson.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-[var(--cc-green)] transition-all"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="路径进度"
              />
            </div>
            <span className="text-xs text-gray-500">
              {lessonIndex}/{totalLessons}
            </span>
          </div>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">{lesson.duration} 分钟</span>
        </div>
      </div>

      {/* Split panel: Instructions | Editor+Output */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-2">
        <section
          className="min-h-0 overflow-y-auto border-r border-[var(--cc-border)] bg-[var(--cc-instruction)] p-6"
          aria-label="课程说明"
        >
          <LessonMarkdown content={lesson.content} />
          <LessonTasks lessonSlug={lesson.slug} tasks={lesson.tasks} />
          <nav
            className="mt-8 flex items-center justify-between border-t border-[var(--cc-border)] pt-6"
            aria-label="课程导航"
          >
            {prevSlug ? (
              <Link
                href={`/learn/${prevSlug}`}
                className="text-sm font-medium text-[var(--cc-green)] hover:underline"
              >
                ← 上一节
              </Link>
            ) : (
              <span />
            )}
            {nextSlug ? (
              <Link
                href={`/learn/${nextSlug}`}
                className="rounded bg-[var(--cc-navy)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--cc-navy-light)]"
              >
                下一节 →
              </Link>
            ) : (
              <Link
                href="/paths/ai-frontend-engineer"
                className="rounded bg-[var(--cc-yellow)] px-4 py-2 text-sm font-bold text-[var(--cc-navy)]"
              >
                完成阶段一 →
              </Link>
            )}
          </nav>
        </section>

        <section className="min-h-[360px] min-h-0 lg:min-h-0" aria-label="代码练习区">
          <CodeWorkspace exerciseId={lesson.exercise} />
        </section>
      </div>
    </div>
  );
};
