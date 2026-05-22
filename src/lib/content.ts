import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LearningPath, Lesson, LessonFrontmatter } from "./types";

const contentDir = path.join(process.cwd(), "content");
const lessonsDir = path.join(contentDir, "lessons");

export const getPaths = (): LearningPath[] => {
  const raw = fs.readFileSync(path.join(contentDir, "paths.json"), "utf-8");
  const data = JSON.parse(raw) as { paths: LearningPath[] };
  return data.paths;
};

export const getPathById = (id: string): LearningPath | undefined =>
  getPaths().find((p) => p.id === id);

const parseLessonFile = (filename: string): Lesson => {
  const filePath = path.join(lessonsDir, filename);
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  return { ...(data as LessonFrontmatter), content };
};

export const getAllLessons = (): Lesson[] => {
  const files = fs
    .readdirSync(lessonsDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files
    .map(parseLessonFile)
    .sort((a, b) => a.order - b.order);
};

export const getLessonBySlug = (slug: string): Lesson | undefined =>
  getAllLessons().find((l) => l.slug === slug);

export const getLessonsForPath = (pathId: string): Lesson[] => {
  const learningPath = getPathById(pathId);
  if (!learningPath) return [];

  const lessons = getAllLessons();
  return learningPath.lessonSlugs
    .map((slug) => lessons.find((l) => l.slug === slug))
    .filter((l): l is Lesson => Boolean(l));
};

export const getAdjacentLessons = (slug: string) => {
  const lesson = getLessonBySlug(slug);
  if (!lesson) return { prev: undefined, next: undefined };

  const pathLessons = getLessonsForPath(lesson.pathId);
  const index = pathLessons.findIndex((l) => l.slug === slug);

  return {
    prev: index > 0 ? pathLessons[index - 1] : undefined,
    next: index < pathLessons.length - 1 ? pathLessons[index + 1] : undefined,
  };
};
