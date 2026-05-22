# AI Frontend Engineer 学习路径

面向已有 **React / Next.js / TypeScript** 基础的前端工程师，系统掌握 AI 产品化所需的前端能力。

## 学习网站（Codecademy 风格）

本地运行：

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)

- **首页** — 继续学习、路径入口
- **`/learn/[slug]`** — 左侧说明 + 右侧代码编辑器与输出
- **`/paths/ai-frontend-engineer`** — Career Path 大纲
- **`/catalog`** — 课程目录

- 未登录：进度在 `localStorage`
- 已登录：**Supabase** 云端同步（[从零教程](./docs/supabase-tutorial.md) · [速查](./docs/supabase-setup.md)）

## 文档学习计划

1. 阅读 [学习计划总览](./docs/00-overview.md)
2. 按阶段打开对应文档，完成每周任务与项目
3. 在 `projects/` 目录提交实战代码
4. 用 [进度清单](./docs/checklist.md) 跟踪完成情况

## 目录结构

```
ai-learn/
├── docs/                 # 学习文档（按阶段）
├── content/              # 网站课程内容
├── src/                  # Next.js 应用
├── projects/             # 实战项目
└── supabase/             # 数据库迁移
```

## 预计周期

| 路径 | 时长 | 说明 |
|------|------|------|
| 全职学习 | 8–10 周 | 每天 4–6 小时 |
| 业余学习 | 16–20 周 | 每周 10–15 小时 |

## 学习目标

学完本路径后，你应能：

- 设计并实现生产级 **AI Chat / Copilot** 前端
- 熟练处理 **流式响应、Token、上下文、多模态** 等 UX 问题
- 使用 **Vercel AI SDK** 或等价方案对接 LLM API
- 理解 **RAG、Agent、Tool Calling** 在前端的呈现与交互设计
- 具备 **Prompt 工程、评估、可观测性** 的基础实践能力
