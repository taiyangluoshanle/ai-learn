---
slug: week-01-intro-llm
title: "认识 LLM 与 Chat API"
pathId: ai-frontend-engineer
phase: 1
week: 1
order: 1
duration: 45
level: Beginner
exercise: explore
tasks:
  - id: read-concepts
    label: 理解 Token、上下文窗口、Temperature
  - id: compare-models
    label: 列出你计划使用的 1 个模型 API
---

## 本节目标

作为 AI 前端工程师，你不需要训练模型，但需要建立正确的心智模型，才能设计出**可取消、可重试、有边界**的 Chat 体验。

## 核心概念

### 1. 大语言模型（LLM）

LLM 根据上下文预测下一个 Token。前端关心的是：

- **延迟**：首字时间（TTFB）决定打字机体验
- **上下文窗口**：能塞进多少历史消息
- **幻觉**：UI 上需要免责声明与引用来源

### 2. Chat Completions

现代产品几乎都使用「消息数组」格式：

```json
[
  { "role": "system", "content": "你是前端专家" },
  { "role": "user", "content": "解释 useEffect" }
]
```

### 3. Temperature

| 值 | 行为 | 适用 |
|----|------|------|
| 0 | 稳定、可复现 | 代码生成、数据提取 |
| 0.7+ | 更有创意 | 文案、头脑风暴 |

## 动手：观察变量

在右侧编辑器中修改 `temperature` 和 `userMessage`，点击顶部黄色 **「运行代码」** 按钮，在下方「输出」面板查看结果（本课为模拟，下一节接真实 API）。

## 检查理解

- [ ] 能向他人解释 Token 是什么
- [ ] 能说明为什么 API Key 不能放在浏览器里

## 下一节

学习 Token 计数与成本意识 → **Tokens 与上下文**
