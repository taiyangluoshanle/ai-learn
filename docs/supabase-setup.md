# Supabase 接入指南

> **新手请先看完整图文教程：[supabase-tutorial.md](./supabase-tutorial.md)**（从创建 Supabase 项目到验证进度同步）

## 1. 创建项目

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard) 新建项目  
2. **Project Settings → API** 复制：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. 本地环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local 填入上述两个变量
```

## 3. 执行数据库迁移

在 Supabase **SQL Editor** 中粘贴并运行：

`supabase/migrations/001_user_progress.sql`

将创建表 `user_progress` 与 RLS 策略。

## 4. Auth 配置

**Authentication → URL Configuration**

| 项 | 本地开发值 |
|----|------------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | `http://localhost:3000/auth/callback` |

**Authentication → Providers → Email**

- 开发阶段可关闭 **Confirm email**，注册后可直接密码登录  
- 生产环境建议开启邮件确认

## 5. 启动项目

```bash
npm run dev
```

访问 `/login` 注册/登录，勾选课程任务后进度会写入 `user_progress` 表。

## 数据模型

| 字段 | 说明 |
|------|------|
| `completed_lessons` | 已完成课时 slug 数组 |
| `completed_tasks` | `{ "week-01-intro-llm": ["task-id", ...] }` |
| `last_lesson_slug` | 上次学习课时 |

## 游客模式

未配置 `.env.local` 时，站点仍可用 **localStorage** 保存进度，与登录前行为一致。
