import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LessonWorkspace } from "@/components/learn/LessonWorkspace";
import {
  getAdjacentLessons,
  getLessonBySlug,
  getLessonsForPath,
  getPathById,
} from "@/lib/content";

type LearnPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const path = getPathById(lesson.pathId);
  const pathLessons = getLessonsForPath(lesson.pathId);
  const { prev, next } = getAdjacentLessons(slug);
  const lessonIndex =
    pathLessons.findIndex((l) => l.slug === slug) + 1 || 1;

  return (
    <>
      <SiteHeader />
      <LessonWorkspace
        lesson={lesson}
        pathTitle={path?.title ?? "学习路径"}
        prevSlug={prev?.slug}
        nextSlug={next?.slug}
        lessonIndex={lessonIndex}
        totalLessons={pathLessons.length}
      />
    </>
  );
}
