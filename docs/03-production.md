# 阶段三：产品化实战（第 7–9 周）

> 目标：完成一个接近真实业务的 AI 产品前端（RAG / Copilot / 文档问答）。

---

## 第 7 周：RAG 前端 — 文档上传与检索 UI

### 学习目标

- 理解 RAG 流程：分块 → 向量化 → 检索 → 生成
- 实现文档上传、解析进度、引用来源展示
- 不做算法，但要会做 **「引用 UI」**

### 理论学习

| 概念 | 前端关注点 |
|------|------------|
| Embedding | 上传进度、处理状态轮询 |
| Chunk | 分块大小影响等待时间 |
| 检索 | Top-K 结果预览 |
| Citation | 答案中 `[1]` 跳转原文高亮 |

### 实践任务

- [ ] 文件上传组件（PDF / MD / TXT），限制大小与类型
- [ ] 处理状态：上传中 → 解析中 → 就绪 / 失败
- [ ] 对话时展示「参考来源」侧边栏或脚注
- [ ] 点击引用跳转到文档对应段落（锚点高亮）

### 技术选型建议

- 向量库：Pinecone / Supabase pgvector（二选一体验即可）
- 解析：LangChain.js `RecursiveCharacterTextSplitter` 或服务端处理
- 前端只关心：jobId、status API、chunks 元数据

---

## 第 8 周：Copilot 模式 — 嵌入式 AI 助手

### 学习目标

- 侧边栏 Copilot vs 内联补全 vs 命令面板
- `@` 提及上下文（文件、组件、选中文本）
- 与现有页面布局共存

### Copilot UX 模式对比

| 模式 | 典型场景 | 实现要点 |
|------|----------|----------|
| 侧边栏 | 全局问答 | 可拖拽宽度、`position: fixed` |
| 内联 | 编辑器内补全 | Ghost text、Tab 接受 |
| 命令面板 | 快捷操作 | `cmdk` + 自然语言路由 |
| 浮动按钮 | 营销站、文档站 | 最小侵入 |

### 周项目：`week-08-copilot`

在任意 Demo 页面（如 Todo 或 Dashboard）上叠加 Copilot：

- 选中文本 → 「解释 / 重构 / 翻译」
- 上下文注入：把选中内容作为 user message 附件
- 不覆盖主页面操作（z-index、焦点管理）

---

## 第 9 周：评估、可观测性与生产 checklist

### 学习目标

- 前端可做的 Logging / Analytics（不含训练）
- 用户反馈（👍👎）与 Trace ID
- 成本意识：Token 用量展示

### 实践任务

- [ ] 每条 assistant 消息旁加反馈按钮，上报 `{ messageId, rating }`
- [ ] 设置页显示「本月 Token 估算」
- [ ] API Route 统一错误格式 `{ error, code, traceId }`
- [ ] 完成 [生产 checklist](./production-checklist.md)

### 阶段三里程碑：文档问答产品

**产品名示例**：DocMind / CodeBase Chat

功能：

- 上传文档 → RAG 问答 → 引用来源
- 或：连接 GitHub 仓库 README 问答（简化版）
- 登录可选（Clerk / NextAuth 选学）
- 部署 + 录 2 分钟演示视频

---

## 阶段三自检

- [ ] 能向非技术人员解释 RAG 用 1 分钟
- [ ] 能画出 Copilot 与主应用的组件树
- [ ] 项目 README 含架构图（可用 Mermaid）

进入 [阶段四](./04-advanced.md)。
