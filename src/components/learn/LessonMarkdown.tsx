"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type LessonMarkdownProps = {
  content: string;
};

export const LessonMarkdown = ({ content }: LessonMarkdownProps) => (
  <article className="prose prose-sm max-w-none prose-headings:text-[var(--cc-navy)] prose-a:text-[var(--cc-green)] prose-code:rounded prose-code:bg-white prose-code:px-1 prose-code:text-[var(--cc-navy)] prose-pre:bg-[var(--cc-navy)] prose-pre:text-white">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </article>
);
