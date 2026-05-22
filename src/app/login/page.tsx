"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { createClientIfConfigured, isSupabaseConfigured } from "@/lib/supabase/client";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const supabase = createClientIfConfigured();
    if (!supabase) {
      setMessage("请先在 .env.local 配置 Supabase");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setMessage(error.message);
      else setMessage("注册成功！请查收邮件确认（若已关闭邮件确认可直接登录）");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage(error.message);
      else router.push("/");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-bold">登录 / 注册</h1>
        <p className="mt-2 text-sm text-gray-600">
          登录后学习进度将同步到 Supabase，换设备也能继续学
        </p>

        {authError && (
          <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            登录回调失败，请重试
          </p>
        )}

        {!configured && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-medium">Supabase 未配置</p>
            <p className="mt-1">
              复制 <code className="rounded bg-amber-100 px-1">.env.example</code> 为{" "}
              <code className="rounded bg-amber-100 px-1">.env.local</code>，并执行{" "}
              <code className="rounded bg-amber-100 px-1">supabase/migrations/001_user_progress.sql</code>
            </p>
            <Link href="/" className="mt-3 inline-block text-[var(--cc-green)] hover:underline">
              暂不登录，继续游客学习 →
            </Link>
          </div>
        )}

        {configured && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[var(--cc-navy)]"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                密码
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[var(--cc-navy)]"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </div>

            {message && (
              <p className="text-sm text-gray-700" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--cc-yellow)] py-2.5 font-bold text-[var(--cc-navy)] disabled:opacity-50"
            >
              {loading ? "处理中…" : mode === "login" ? "登录" : "注册"}
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="w-full text-sm text-[var(--cc-green)] hover:underline"
            >
              {mode === "login" ? "没有账号？注册" : "已有账号？登录"}
            </button>
          </form>
        )}
      </main>
    </>
  );
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <>
          <SiteHeader />
          <main className="px-4 py-16 text-center text-gray-500">加载中…</main>
        </>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
