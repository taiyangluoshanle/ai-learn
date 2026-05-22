import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";

type SiteHeaderProps = {
  active?: "home" | "catalog" | "path";
};

const navItems = [
  { href: "/", label: "首页", key: "home" as const },
  { href: "/catalog", label: "课程目录", key: "catalog" as const },
  { href: "/paths/ai-frontend-engineer", label: "学习路径", key: "path" as const },
];

export const SiteHeader = ({ active }: SiteHeaderProps) => (
  <header className="flex h-14 items-center justify-between border-b border-[var(--cc-border)] bg-[var(--cc-navy)] px-4 text-white">
    <div className="flex items-center gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold tracking-tight"
        aria-label="AI Learn 首页"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--cc-yellow)] text-sm font-black text-[var(--cc-navy)]">
          AI
        </span>
        <span>AI Learn</span>
      </Link>
      <nav className="hidden gap-4 text-sm md:flex" aria-label="主导航">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={
              active === item.key
                ? "text-[var(--cc-yellow)]"
                : "text-white/80 hover:text-white"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-3">
      <AuthButton />
      <Link
        href="/paths/ai-frontend-engineer"
        className="rounded bg-[var(--cc-yellow)] px-4 py-1.5 text-sm font-semibold text-[var(--cc-navy)] hover:opacity-90"
      >
        继续学习
      </Link>
    </div>
  </header>
);
