---
slug: week-01-tokens
title: "Tokens 与上下文窗口"
pathId: ai-frontend-engineer
phase: 1
week: 1
order: 2
duration: 40
level: Beginner
exercise: tokens
tasks:
  - id: estimate-tokens
    label: 估算一段 React 组件代码的 Token 数
  - id: context-limit
    label: 说明超出上下文窗口时前端可怎么处理
---

## 为什么前端必须懂 Token

Token 直接影响：

1. **账单** — 按输入 + 输出计费
2. **截断** — 超长对话会被裁掉早期消息
3. **速度** — 生成长度上限 `max_tokens`

## 粗算规则（英文为主时）

- 1 Token ≈ 4 个英文字符
- 中文往往 **1 字 ≈ 1–2 Token**（因分词而异）

## 上下文窗口策略

当消息历史接近上限，产品常见做法：

| 策略 | 前端表现 |
|------|----------|
| 滑动窗口 | 只发最近 N 条 |
| 摘要 | 显示「已压缩较早对话」 |
| 分支会话 | 新建 Chat，旧会话只读 |

## 练习

在编辑器中运行 Token 估算函数，尝试加长 `sampleCode` 字符串，观察估算值变化。

## 延伸阅读

- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
