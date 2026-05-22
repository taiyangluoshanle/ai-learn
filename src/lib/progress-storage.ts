import type { ProgressState } from "./types";

export const PROGRESS_STORAGE_KEY = "ai-learn-progress-v1";

export const defaultProgress = (): ProgressState => ({
  completedLessons: [],
  completedTasks: {},
  lastLessonSlug: null,
});

export const loadProgress = (): ProgressState => {
  if (typeof window === "undefined") return defaultProgress();

  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
};

export const saveProgress = (state: ProgressState) => {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
};

export const calcPathProgress = (
  lessonSlugs: string[],
  completedLessons: string[]
) => {
  if (lessonSlugs.length === 0) return 0;
  const done = lessonSlugs.filter((s) => completedLessons.includes(s)).length;
  return Math.round((done / lessonSlugs.length) * 100);
};
