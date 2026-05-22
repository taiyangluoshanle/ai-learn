# 实战项目

按学习计划顺序创建子目录并实现。每个项目应有独立 `README.md`。

## 项目列表

| 周次 | 目录 | 说明 |
|------|------|------|
| 1–2 | `week-01-prompt-lab` | Prompt 实验与对比 |
| 3–6 | `week-04-chat-ui` | 流式 Chat 应用（可合并多周） |
| 7–9 | `week-08-copilot` | 嵌入式 Copilot |
| 7–9 | `week-09-doc-qa` | 文档 RAG 问答（阶段三里程碑） |

## 初始化命令（Week 4 起推荐）

```bash
cd projects/week-04-chat-ui
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
npm install ai @ai-sdk/openai
```

## 环境变量模板

在各项目根目录创建 `.env.local`（勿提交）：

```env
OPENAI_API_KEY=sk-...
# 或
ANTHROPIC_API_KEY=sk-ant-...
```
