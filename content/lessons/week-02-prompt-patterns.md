---
slug: week-02-prompt-patterns
title: "Prompt 模式：Zero-shot 与 Few-shot"
pathId: ai-frontend-engineer
phase: 1
week: 2
order: 4
duration: 45
level: Beginner
exercise: prompt
tasks:
  - id: zero-shot
    label: 编写一个 Zero-shot 代码审查 Prompt
  - id: few-shot
    label: 添加 2 个 Few-shot 示例统一输出格式
---

## Zero-shot

只给指令，不给示例。适合规则清晰的任务：

```
审查以下 React 代码，列出 bug 与可访问性问题，用中文回答。
```

## Few-shot

在指令后给出输入/输出示例，模型会模仿格式：

```
示例 1：
输入：<button onclick="...">
输出：1. 使用 onClick 2. 添加 type="button"

示例 2：
...
```

## 前端产品中的 Prompt

- **System Prompt** 常放在设置页，高级用户可编辑
- **用户输入** 不可信 — 防范 Prompt Injection
- **版本管理** — 和发版一样对待 System Prompt 变更

## 练习

在编辑器中修改 `systemPrompt` 与 `fewShotExamples`，观察模拟输出的差异。
