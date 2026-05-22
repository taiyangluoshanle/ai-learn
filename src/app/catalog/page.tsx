import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllLessons, getPaths } from "@/lib/content";

export default function CatalogPage() {
  const lessons = getAllLessons();
  const paths = getPaths();

  return (
    <>
      <SiteHeader active="catalog" />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">课程目录</h1>
        <p className="mt-2 text-gray-600">
          类似 Codecademy Catalog，按路径浏览全部课时
        </p>

        {paths.map((path) => (
          <section key={path.id} className="mt-10">
            <h2 className="text-lg font-bold">{path.title}</h2>
            <ul className="mt-4 space-y-2">
              {lessons
                .filter((l) => l.pathId === path.id)
                .map((lesson, i) => (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${lesson.slug}`}
                      className="flex items-center justify-between rounded-lg border border-[var(--cc-border)] px-4 py-3 hover:bg-[var(--cc-instruction)]"
                    >
                      <span>
                        <span className="mr-2 text-xs text-gray-400">
                          {i + 1}.
                        </span>
                        {lesson.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lesson.duration} 分钟 · {lesson.level}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
