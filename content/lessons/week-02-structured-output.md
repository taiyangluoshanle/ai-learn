---
slug: week-02-structured-output
title: "结构化输出 JSON"
pathId: ai-frontend-engineer
phase: 1
week: 2
order: 5
duration: 40
level: Beginner
exercise: json
tasks:
  - id: parse-json
    label: 解析模型返回的 JSON 并校验字段
  - id: error-ui
    label: 思考解析失败时 UI 如何提示用户
---

## 为什么需要结构化输出

前端要把模型结果接到 UI 上：卡片列表、表单、图表——都需要 **可解析的 JSON**，而不是自由文本。

## 推荐做法

1. 在 Prompt 中明确 Schema
2. 使用厂商 **JSON mode** / **Structured Outputs**
3. 前端：`JSON.parse` + Zod 校验

## 示例 Schema

```json
{
  "title": "string",
  "items": [{ "label": "string", "done": "boolean" }]
}
```

## 失败时的 UX（Codecademy 也会强调）

- 显示「模型返回格式异常」
- 提供「重试」按钮
- 开发环境可展示 raw 文本

## 练习

运行编辑器代码，故意破坏 JSON，观察校验逻辑如何报错。

## 阶段一里程碑

完成 [Prompt Lab](/projects) 周项目，并在路径页勾选阶段一清单。
