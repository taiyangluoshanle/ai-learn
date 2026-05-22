# 阶段四：进阶与职业（第 10 周+）

> 目标：性能、安全、面试准备，形成可求职的 AI 前端作品集。

---

## 第 10 周：性能与体验优化

### 主题清单

| 主题 | 实践 |
|------|------|
| 首屏与 bundle | 动态 import `react-markdown`、代码分割 |
| 流式性能 | 节流渲染（每 50ms 批量 setState） |
| 缓存 | 相同 System Prompt 的 prefix 缓存（了解即可） |
| 离线 | 队列发送、失败重试 UI |
| 国际化 | AI 回复语言检测与切换 |

### 性能指标（自定目标）

- LCP < 2.5s（Chat 页）
- 流式首字延迟 < 800ms（取决于模型）
- 100 条消息列表滚动流畅（虚拟列表）

---

## 第 11 周：安全、合规与滥用防护

### 前端必须知道

- **API Key 永不进浏览器** — 仅 Server Route / Edge
- **Prompt Injection** — 用户输入不可信，展示时消毒
- **XSS** — Markdown 渲染禁用危险 HTML
- **Rate Limit** — 按 IP / 用户限流（middleware）
- **内容审核** — 了解 Moderation API 存在即可

### 实践任务

- [ ] 审计项目：搜索 `sk-`、`API_KEY` 是否泄露
- [ ] `react-markdown` 配置 `rehype-sanitize`
- [ ] 实现每日消息条数限制（前端提示 + 后端校验）

---

## 第 12 周：Agent UI 与多步任务（选学）

### 概念

- ReAct、Plan-and-Execute 的 **用户可见** 步骤
- 步骤条：思考 → 调用工具 → 观察 → 回答
- 长时间任务：WebSocket 或轮询 job 状态

### 实践

- [ ] 实现「任务步骤」时间线组件
- [ ] 支持用户在中途取消 Agent 循环
- [ ] 阅读 [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents)

---

## 作品集建议（3 个项目）

| 项目 | 展示能力 | 面试话术 |
|------|----------|----------|
| AI Chat 工作台 | 流式、多会话、SDK | 「我处理了取消和重试边界」 |
| 文档 RAG 问答 | 上传、引用、状态机 | 「引用 UI 是我设计的核心」 |
| Copilot 插件 | 上下文注入、嵌入式 | 「最小侵入集成现有页面」 |

每个项目：

- GitHub 公开 + Vercel 在线 Demo
- README：问题、方案、截图、技术栈
- 1 篇技术博客（掘金 / 个人站）

---

## 面试题库（AI 前端方向）

### 概念题

1. 流式响应和轮询的区别？为什么 Chat 用流式？
2. 如何在前端实现「停止生成」？
3. Token 超限你会怎么处理？（截断、摘要、滑动窗口）
4. RAG 里前端要展示哪些元数据？
5. Tool Calling 的结果如何呈现才清晰？

### 编码题（自练）

- 用 `fetch` + `ReadableStream` 实现简易打字机
- 实现一个支持 `@file` 解析的输入框
- 设计 `Message` 类型的 discriminated union（text / image / tool）

### 系统设计（简版）

- 设计 Notion AI 侧边栏的前端架构
- 1000 条消息历史的存储与同步策略

---

## 持续学习资源

见 [resources/links.md](../resources/links.md)

### 社区

- Vercel AI SDK Discord / GitHub Discussions
- LangChain.js 文档更新
- 关注 `@rauchg`、`@shadcn`、各模型厂商 Changelog

---

## 学完之后

可选方向：

| 方向 | 下一步 |
|------|--------|
| 深耕 AI 前端 | 开源 Chat UI 组件库、贡献 AI SDK |
| 全栈 AI | 学 LangGraph、评估框架 LangSmith |
| 产品 | 学 AI PRD、指标（留存、采纳率） |

祝你成为 **能把 AI 能力做成好用产品** 的前端工程师。
