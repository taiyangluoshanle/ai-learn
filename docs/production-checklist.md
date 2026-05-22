# AI 前端生产 Checklist

上线前逐项确认。

## 安全

- [ ] API Key 仅存在于服务端环境变量
- [ ] `.env*` 已加入 `.gitignore`
- [ ] 用户输入经后端转发，不直连模型厂商（防 Key 泄露）
- [ ] Markdown 渲染已消毒（`rehype-sanitize` 或等价）
- [ ] 文件上传有类型、大小限制

## 可靠性

- [ ] 流式请求支持 `AbortController` 取消
- [ ] 网络错误有重试或明确提示
- [ ] API Route 有统一错误格式与日志
- [ ] 超时策略（Edge / Serverless 限制）

## 体验

- [ ] Loading / Empty / Error 三态完整
- [ ] 流式内容 `aria-live="polite"`
- [ ] 移动端输入框不被键盘遮挡
- [ ] 长对话性能可接受（虚拟列表或分页）

## 成本与限制

- [ ] 按用户/IP 限流
- [ ] `maxTokens` 有上限
- [ ] 可选：Token 用量对用户可见

## 可观测

- [ ] 关键错误带 `traceId`
- [ ] 用户反馈可关联 `messageId`
- [ ] 基础 Analytics（发送量、错误率）

## 部署

- [ ] 环境变量已在 Vercel / 平台配置
- [ ] 构建通过，无客户端意外引入 Node 模块
- [ ] README 含 Demo 链接与架构说明
