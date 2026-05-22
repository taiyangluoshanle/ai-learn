# 阶段一：AI 基础（第 1–2 周）

> 目标：建立正确心智模型，能独立调用 LLM API 并做基础 Prompt 实验。

---

## 第 1 周：LLM 工作原理与 API

### 学习目标

- 理解 Token、上下文窗口、Temperature、Top-p
- 会使用 OpenAI / Anthropic / 国内大模型 API（至少一种）
- 能解释 Chat Completions vs Completions 的区别

### 理论学习（8h）

| 主题 | 资源 | 时间 |
|------|------|------|
| LLM 基础概念 | [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) | 2h |
| Token 与计费 | OpenAI Tokenizer 文档 + [tiktoken](https://github.com/openai/tiktoken) 体验 | 1h |
| API 形态 | 所选厂商 Quickstart | 2h |
| 安全与密钥 | 环境变量、绝不提交 `.env` | 1h |
| 行业概览 | 浏览 Vercel AI、LangChain.js 文档目录结构 | 2h |

### 实践任务

- [ ] 用 `curl` 或 Postman 完成一次非流式 Chat 请求
- [ ] 用 Node 脚本完成一次流式请求并打印到终端
- [ ] 对比 `temperature: 0` vs `1` 的输出差异，截图记录
- [ ] 计算一段典型前端代码的 Token 数量

### 周项目：`week-01-prompt-lab`

在 `projects/week-01-prompt-lab` 实现一个最小 Web 页面：

- 左侧：System / User Prompt 输入
- 右侧：模型输出（先非流式即可）
- 底部：显示预估 Token 数（可用字符估算或 tiktoken）

**验收标准**：能切换 2 组 Prompt 模板并看到明显不同的输出。

---

## 第 2 周：Prompt 工程基础

### 学习目标

- 掌握 Zero-shot、Few-shot、Chain-of-Thought
- 会使用 JSON Mode / Structured Output
- 理解 System Prompt 在产品中的角色

### 理论学习（6h）

| 模式 | 要点 | 练习 |
|------|------|------|
| Zero-shot | 直接指令 | 让模型生成 React 组件 |
| Few-shot | 示例驱动 | 统一代码风格转换 |
| CoT | 「逐步思考」 | 复杂逻辑拆解 |
| 结构化输出 | JSON Schema | 生成 TypeScript 类型 |

### 实践任务

- [ ] 编写 3 个 System Prompt：代码审查 / 文案润色 / UI 文案生成
- [ ] 实现 Few-shot：输入 HTML，输出 Tailwind 类名
- [ ] 使用 Structured Output 生成 `{ title, items[] }` 并 `JSON.parse` 校验
- [ ] 记录 5 条「Prompt 失败」案例及修复方式

### 周项目：Prompt 对比器增强

在 Week 1 项目上增加：

- A/B 两个 Prompt 并排对比
- 导出对话为 Markdown
- 简单的「评分」按钮（人工标记好/坏，本地 localStorage）

---

## 阶段一自检

完成 [checklist.md](./checklist.md) 中「阶段一」所有项后，进入 [阶段二](./02-frontend-core.md)。

### 推荐阅读

- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)（可选，建立直觉）
- [Simon Willison: LLMs](https://simonwillison.net/tags/llms/) 标签文章精选
