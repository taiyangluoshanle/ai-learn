import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContinueLearning } from "@/components/home/ContinueLearning";
import { getPaths, getLessonsForPath } from "@/lib/content";

export default function HomePage() {
  const paths = getPaths();
  const mainPath = paths[0];
  const lessons = mainPath ? getLessonsForPath(mainPath.id) : [];

  return (
    <>
      <SiteHeader active="home" />
      <main>
        {/* Hero — Codecademy-inspired */}
        <section className="bg-[var(--cc-navy)] px-4 py-16 text-white md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              培养你的
              <span className="text-[var(--cc-yellow)]"> /skills</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              参考 Codecademy 的「边学边练」体验，系统学习 AI 前端：流式 Chat、RAG UI、Copilot 与生产实践。
            </p>
            <Link
              href={
                lessons[0]
                  ? `/learn/${lessons[0].slug}`
                  : "/paths/ai-frontend-engineer"
              }
              className="mt-8 inline-block rounded bg-[var(--cc-yellow)] px-8 py-3 font-bold text-[var(--cc-navy)] hover:opacity-90"
            >
              免费开始学习
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12">
          {mainPath && (
            <ContinueLearning
              pathId={mainPath.id}
              pathTitle={mainPath.title}
              lessonSlugs={mainPath.lessonSlugs}
              firstLessonSlug={mainPath.lessonSlugs[0]}
              lessonsMeta={lessons.map((l) => ({
                slug: l.slug,
                title: l.title,
              }))}
            />
          )}
        </section>

        {/* Designed for progress */}
        <section className="border-t border-[var(--cc-border)] bg-[var(--cc-instruction)] px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-bold">为进步而设计</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-gray-600">
              借鉴 Codecademy 的核心体验：引导式路径、浏览器内编码、即时输出。
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "引导式路径",
                  desc: "四阶段 Career Path，从 LLM 基础到 Copilot 实战",
                },
                {
                  title: "浏览器内编码",
                  desc: "无需本地配置，左侧说明、右侧编辑器与控制台",
                },
                {
                  title: "即时反馈",
                  desc: "修改代码点击 Run，立刻在输出面板查看结果",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--cc-border)] bg-white p-6"
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {paths.map((path) => (
          <section key={path.id} className="mx-auto max-w-4xl px-4 py-8">
            <Link
              href={`/paths/${path.id}`}
              className="block rounded-xl border-2 border-[var(--cc-navy)] p-6 transition hover:bg-gray-50"
            >
              <span className="text-xs font-semibold text-[var(--cc-green)]">
                Career Path · {path.level}
              </span>
              <h3 className="mt-1 text-xl font-bold">{path.title}</h3>
              <p className="mt-2 text-gray-600">{path.description}</p>
              <p className="mt-3 text-sm text-gray-500">约 {path.hours} 小时</p>
            </Link>
          </section>
        ))}
      </main>
    </>
  );
}
