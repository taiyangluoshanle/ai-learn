export type LessonTask = {
  id: string;
  label: string;
};

export type LessonFrontmatter = {
  slug: string;
  title: string;
  pathId: string;
  phase: number;
  week: number;
  order: number;
  duration: number;
  level: string;
  exercise: string;
  tasks: LessonTask[];
};

export type Lesson = LessonFrontmatter & {
  content: string;
};

export type PathPhase = {
  id: number;
  title: string;
  weeks: string;
};

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  level: string;
  hours: number;
  phases: PathPhase[];
  lessonSlugs: string[];
};

export type ProgressState = {
  completedLessons: string[];
  completedTasks: Record<string, string[]>;
  lastLessonSlug: string | null;
};
