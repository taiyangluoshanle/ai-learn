import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getPathById, getLessonsForPath } from "@/lib/content";

type PathPageProps = {
  params: Promise<{ pathId: string }>;
};

export default async function PathPage({ params }: PathPageProps) {
  const { pathId } = await params;
  const path = getPathById(pathId);
  if (!path) notFound();

  const lessons = getLessonsForPath(pathId);
  const firstSlug = lessons[0]?.slug;

  return (
    <>
      <SiteHeader active="path" />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <span className="text-xs font-semibold uppercase text-[var(--cc-green)]">
          Career Path
        </span>
        <h1 className="mt-1 text-3xl font-bold">{path.title}</h1>
        <p className="mt-3 text-gray-600">{path.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
          <span>{path.level}</span>
          <span>·</span>
          <span>约 {path.hours} 小时</span>
          <span>·</span>
          <span>{lessons.length} 节课</span>
        </div>

        {firstSlug && (
          <Link
            href={`/learn/${firstSlug}`}
            className="mt-6 inline-block rounded bg-[var(--cc-yellow)] px-6 py-2.5 font-bold text-[var(--cc-navy)]"
          >
            开始第一课
          </Link>
        )}

        <section className="mt-12">
          <h2 className="text-lg font-bold">路径阶段</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {path.phases.map((phase) => (
              <div
                key={phase.id}
                className="rounded-lg border border-[var(--cc-border)] p-4"
              >
                <span className="text-xs text-gray-500">阶段 {phase.id}</span>
                <h3 className="font-semibold">{phase.title}</h3>
                <p className="text-sm text-gray-500">第 {phase.weeks} 周</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-bold">课程大纲</h2>
          <ol className="mt-4 space-y-2">
            {lessons.map((lesson, index) => (
              <li key={lesson.slug}>
                <Link
                  href={`/learn/${lesson.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-[var(--cc-border)] px-4 py-3 hover:border-[var(--cc-navy)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--cc-instruction)] text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-xs text-gray-500">
                      第 {lesson.week} 周 · {lesson.duration} 分钟
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
