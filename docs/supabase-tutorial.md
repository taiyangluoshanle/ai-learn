# Supabase 从零配置教程（AI Learn）

按顺序完成每一步，大约 **15–20 分钟**。

---

## 第 0 步：你需要准备什么

- 一个邮箱（注册 Supabase）
- 本项目已 clone 到本地：`d:\TEST0423\ai-learn`
- Node.js 已安装（能跑 `npm run dev`）

---

## 第 1 步：注册并创建 Supabase 项目

1. 打开 **[https://supabase.com](https://supabase.com)**，点击 **Start your project**
2. 用 **GitHub** 或 **邮箱** 注册/登录
3. 进入 Dashboard 后，点击 **New project**
4. 填写：

   | 字段 | 建议 |
   |------|------|
   | Organization | 默认或新建均可 |
   | **Name** | `ai-learn`（任意英文名） |
   | **Database Password** | 自己记牢（仅用于直连数据库，本教程主要用 API） |
   | **Region** | 选离你可访问的最近区域（如 Singapore / Tokyo） |

5. 点击 **Create new project**，等待 **1–2 分钟**（状态变为绿色 Active）

> 免费套餐（Free tier）足够个人学习站使用。

---

## 第 2 步：拿到 API 密钥（连到 Next.js）

1. 左侧菜单 **Project Settings**（齿轮图标）
2. 子菜单 **API**
3. 复制下面两项到记事本（先不要发给别人）：

   | Supabase 页面上的名称 | 填入 `.env.local` 的变量名 |
   |----------------------|---------------------------|
   | **Project URL** | `NEXT_PUBLIC_SUPABASE_URL` |
   | **anon public**（Publishable 也可） | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

4. 在项目根目录编辑 `.env.local`（没有就从 `.env.example` 复制）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **保存文件**，重启开发服务器（改 env 后必须重启）：

```bash
npm run dev
```

> 注意：`.env.local` 已在 `.gitignore`，不要提交到 Git。

---

## 第 3 步：创建数据库表（学习进度）

1. Supabase 左侧 **SQL Editor**
2. 点击 **New query**
3. 打开本仓库文件  
   `supabase/migrations/001_user_progress.sql`  
   **全选复制**，粘贴到 SQL 编辑器
4. 点击右下角 **Run**（或 Ctrl+Enter）
5. 底部应显示 **Success**，无红色报错

### 验证表是否创建成功

1. 左侧 **Table Editor**
2. 应能看到表 **`user_progress`**，列包括：
   - `user_id`
   - `completed_lessons`
   - `completed_tasks`
   - `last_lesson_slug`
   - `updated_at`

---

## 第 4 步：配置登录（Auth）

### 4.1 回调地址（必做）

1. 左侧 **Authentication** → **URL Configuration**
2. 设置：

   | 配置项 | 值 |
   |--------|-----|
   | **Site URL** | `http://localhost:3000` |
   | **Redirect URLs** | `http://localhost:3000/auth/callback` |

3. 点击 **Save**

### 4.2 开发环境：关闭邮件确认（推荐）

否则注册后必须点邮件链接才能登录。

1. **Authentication** → **Providers** → **Email**
2. 找到 **Confirm email**，**关闭**（OFF）
3. **Save**

### 4.3 确认 Email 登录已开启

同一页面确保 **Enable Email provider** 为开启状态。

---

## 第 5 步：本地测试登录

1. 终端运行：

```bash
cd d:\TEST0423\ai-learn
npm run dev
```

2. 浏览器打开 **http://localhost:3000/login**
3. 点击 **没有账号？注册**
4. 输入邮箱 + 密码（至少 6 位）→ **注册**
5. 若已关闭邮件确认，再点 **已有账号？登录** 用同一账号 **登录**
6. 登录成功后应跳回首页，右上角显示邮箱 + **退出**

### 若登录报错

| 现象 | 处理 |
|------|------|
| `Invalid API key` | 检查 `.env.local` 是否贴错、是否重启 `npm run dev` |
| 注册成功但无法登录 | 去 Auth → Users 看用户是否存在；确认已关闭 Confirm email |
| 一直转圈 | 打开浏览器 F12 → Network，看请求是否连上 `*.supabase.co` |

---

## 第 6 步：测试学习进度同步

1. 登录状态下打开任意课程，例如：  
   **http://localhost:3000/learn/week-01-intro-llm**
2. 勾选 **本节任务** 里的复选框
3. 顶栏应短暂显示 **同步中…**，然后 **已云端同步**
4. 在 Supabase **Table Editor** → `user_progress` → 应出现一行：
   - `user_id` = 你的用户 UUID
   - `completed_tasks` 里有 JSON，例如 `{"week-01-intro-llm":["read-concepts"]}`

5. **换设备验证**：无痕窗口登录同一账号，进度应能合并显示

---

## 第 7 步：在 Supabase 里查看用户

1. **Authentication** → **Users**  
   - 能看到刚注册的邮箱
2. **Table Editor** → **user_progress**  
   - 每个用户一行进度

---

## 架构说明（帮你理解项目在干什么）

```
浏览器 (Next.js)
    │
    ├─ 未登录 → localStorage 存进度
    │
    └─ 已登录 → Supabase Auth (JWT)
                    │
                    └─ user_progress 表 (RLS: 只能读写自己的行)
```

- **anon key**：只能在前端使用，配合 RLS 保证用户只能访问自己的数据
- **service_role key**：本教程**不要**放进前端，不要写进 `.env.local` 的 `NEXT_PUBLIC_*`

---

## 上线到 Vercel 时（以后再做）

1. Vercel 项目 **Environment Variables** 填入同样的两个变量
2. Supabase **URL Configuration** 增加：
   - Site URL: `https://你的域名.vercel.app`
   - Redirect URLs: `https://你的域名.vercel.app/auth/callback`

---

## 常见问题

**Q：不登录能用吗？**  
能。不配置 Supabase 或不上登录，进度只在浏览器 localStorage。

**Q：SQL 执行报错 policy already exists？**  
说明跑过一遍了，可忽略；或在 SQL Editor 先 `drop table if exists public.user_progress cascade;` 再重新 Run（会清空进度数据）。

**Q：中国网络连不上？**  
尝试换 Region、检查代理；Supabase 控制台能打开一般即可。

---

##  checklist（自检）

- [ ] Supabase 项目状态 Active
- [ ] `.env.local` 两个变量已填
- [ ] SQL `001_user_progress.sql` 执行成功
- [ ] Auth Site URL + Redirect URLs 已配置
- [ ] Confirm email 已关闭（开发）
- [ ] `/login` 能注册并登录
- [ ] 勾选任务后 `user_progress` 表有数据

全部打勾即配置完成。
