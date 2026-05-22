---
slug: week-01-first-api
title: "第一次调用 Chat API"
pathId: ai-frontend-engineer
phase: 1
week: 1
order: 3
duration: 50
level: Beginner
exercise: fetch
tasks:
  - id: curl-request
    label: 用 curl 或 Postman 完成一次非流式请求
  - id: env-setup
    label: 在本地配置 .env.local（不提交 Git）
---

## 安全原则

> **API Key 只存在于服务端。**  
> 浏览器里的 Key 等于公开。

本学习站后续会在 Next.js `app/api` 中转发请求；本节先在编辑器里理解请求**结构**。

## 请求结构

```javascript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello!" },
    ],
  }),
});
```

## 流式 vs 非流式

- **非流式**：一次返回完整 `content`，实现简单
- **流式（SSE）**：逐块到达，Chat 产品几乎必选

Codecademy 式学习：先跑通非流式，第 3 阶段再上 `useChat` 流式 UI。

## 任务

1. 修改 `userMessage` 并运行模拟请求
2. 阅读输出中的 `usage` 字段（模拟数据）

## 下周预告

Prompt Lab 项目 — 左右对比不同 System Prompt 的输出。
