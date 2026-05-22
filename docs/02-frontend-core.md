# 阶段二：AI 前端核心（第 3–6 周）

> 目标：用 React/Next.js 构建生产级 Chat 体验，掌握流式、状态与 SDK。

---

## 第 3 周：流式响应与 Chat UI 基础

### 学习目标

- 理解 SSE / 流式 HTTP 在前端的消费方式
- 掌握 Vercel AI SDK 的 `useChat` / `streamText`
- 实现可取消、可重试的请求

### 理论学习

| 主题 | 要点 |
|------|------|
| 流式协议 | `ReadableStream`、`TextDecoder`、SSE 事件格式 |
| UX 模式 | 打字机效果、光标闪烁、逐字 vs 逐块 |
| 错误处理 | 网络中断、中途取消、`AbortController` |
| 无障碍 | 流式内容的 `aria-live` 区域 |

### 实践任务

- [ ] 阅读 [Vercel AI SDK 文档](https://sdk.vercel.ai/docs) Getting Started
- [ ] 创建 Next.js 项目，配置 `app/api/chat/route.ts`
- [ ] 实现 `useChat` 基础对话页
- [ ] 添加「停止生成」按钮（`stop()`）
- [ ] 添加 Loading / Error / Empty 三态

### 周项目：`week-04-chat-ui`

目录：`projects/week-04-chat-ui`

功能清单：

- 消息列表（user / assistant 气泡）
- 输入框 + Enter 发送
- 流式渲染 + 停止
- 深色模式（Tailwind `dark:`）

**参考组件结构**：

```
components/
  chat/
    ChatContainer.tsx
    MessageList.tsx
    MessageItem.tsx
    ChatInput.tsx
    StreamingIndicator.tsx
```

---

## 第 4 周：消息状态、持久化与多会话

### 学习目标

- 设计消息数据模型（id、role、content、createdAt、status）
- 实现多 Tab 会话切换
- 本地持久化（localStorage / IndexedDB）

### 实践任务

- [ ] 定义 `Message` / `ChatSession` TypeScript 类型
- [ ] 用 Zustand 或 Context 管理多会话
- [ ] 刷新页面后会话不丢失
- [ ] 实现「重新生成」最后一条 assistant 消息
- [ ] 实现「编辑 user 消息并重新提交」

### 设计要点

| 问题 | 建议方案 |
|------|----------|
| 消息过长 | 虚拟列表（`@tanstack/react-virtual`） |
| 历史截断 | 显示「已省略 N 条」+ 展开 |
| 并发请求 | 禁用发送或队列化 |
| Markdown 渲染 | `react-markdown` + 代码高亮 `shiki` |

---

## 第 5 周：多模态与 Tool Calling（前端视角）

### 学习目标

- 图片上传 + Vision API 的前端流程
- 理解 Tool / Function Calling 的 UI 呈现
- 实现「工具执行中」状态反馈

### 实践任务

- [ ] 图片拖拽上传，预览后随消息发送
- [ ] 使用 AI SDK 的 `tools` 定义 1–2 个简单工具（如：获取天气、计算器）
- [ ] UI 展示：工具调用名、参数、结果（可折叠 JSON）
- [ ] 用户确认后再执行敏感工具（Human-in-the-loop 模式）

### 周项目：带工具的 Chat

扩展 Chat 应用：

- 至少 1 个客户端可见的 Tool 调用流程
- 工具失败时的友好错误 UI

---

## 第 6 周：Prompt 模板、系统设置与 UX 打磨

### 学习目标

- 可配置 System Prompt（设置面板）
- 模型参数暴露（temperature、maxTokens）
- 键盘快捷键与移动端适配

### 实践任务

- [ ] 设置页：模型选择、System Prompt、参数滑块
- [ ] 预设角色：「前端专家」「代码审查」「英译中」
- [ ] 快捷键：`Cmd+Enter` 发送、`Esc` 停止
- [ ] 响应式：移动端底部输入栏安全区

### 阶段二里程碑项目

将前 4 周成果整合为 **「个人 AI 工作台」**：

- 多会话 + 持久化 + 流式 + 设置 + 至少 1 个 Tool
- 部署到 Vercel，获得可分享 URL
- 写 300 字 README 说明技术选型

---

## 阶段二自检

确保能在面试中清晰讲解：

1. 流式响应从 API Route 到组件的完整数据流
2. 为什么需要 `AbortController`
3. `useChat` 的消息状态机

进入 [阶段三：产品化实战](./03-production.md)。
