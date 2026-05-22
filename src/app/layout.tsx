import type { Metadata } from "next";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Learn — AI Frontend Engineer",
  description: "Codecademy 风格的 AI 前端工程师学习平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white antialiased">
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
