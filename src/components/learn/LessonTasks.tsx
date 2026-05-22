"use client";

import { useEffect, useState } from "react";
import type { LessonTask } from "@/lib/types";
import { useProgress } from "@/components/providers/ProgressProvider";

type LessonTasksProps = {
  lessonSlug: string;
  tasks: LessonTask[];
  onAllComplete?: () => void;
};

export const LessonTasks = ({
  lessonSlug,
  tasks,
  onAllComplete,
}: LessonTasksProps) => {
  const { progress, updateProgress, loading } = useProgress();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (loading) return;
    const done = progress.completedTasks[lessonSlug] ?? [];
    setChecked(new Set(done));
  }, [lessonSlug, progress.completedTasks, loading]);

  const handleToggle = (taskId: string) => {
    const next = new Set(checked);
    if (next.has(taskId)) next.delete(taskId);
    else next.add(taskId);

    setChecked(next);

    updateProgress((prev) => {
      const updated = { ...prev };
      updated.completedTasks = {
        ...updated.completedTasks,
        [lessonSlug]: [...next],
      };
      updated.lastLessonSlug = lessonSlug;

      if (
        next.size === tasks.length &&
        !updated.completedLessons.includes(lessonSlug)
      ) {
        updated.completedLessons = [
          ...updated.completedLessons,
          lessonSlug,
        ];
        onAllComplete?.();
      }

      return updated;
    });
  };

  return (
    <section
      className="mt-6 rounded-lg border border-[var(--cc-border)] bg-white p-4"
      aria-label="本节任务"
    >
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--cc-navy)]">
        本节任务
      </h3>
      <ul className="space-y-2">
        {tasks.map((task) => {
          const isDone = checked.has(task.id);
          return (
            <li key={task.id}>
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={isDone}
                  disabled={loading}
                  onChange={() => handleToggle(task.id)}
                  className="mt-0.5 h-4 w-4 accent-[var(--cc-green)]"
                  aria-label={task.label}
                />
                <span className={isDone ? "text-gray-400 line-through" : ""}>
                  {task.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-gray-500">
        完成全部任务后标记本节完成；登录后进度自动同步 Supabase
      </p>
    </section>
  );
};
