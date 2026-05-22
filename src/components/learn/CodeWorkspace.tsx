"use client";

import { useCallback, useEffect, useState } from "react";
import { getExerciseCode } from "@/lib/exercises";

type CodeWorkspaceProps = {
  exerciseId: string;
};

type ConsoleLine = { type: "log" | "error" | "warn"; text: string };

const runUserCode = (code: string): ConsoleLine[] => {
  const lines: ConsoleLine[] = [];
  const customConsole = {
    log: (...args: unknown[]) => {
      lines.push({
        type: "log",
        text: args
          .map((a) =>
            typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
          )
          .join(" "),
      });
    },
    error: (...args: unknown[]) => {
      lines.push({
        type: "error",
        text: args.map(String).join(" "),
      });
    },
    warn: (...args: unknown[]) => {
      lines.push({
        type: "warn",
        text: args.map(String).join(" "),
      });
    },
  };

  try {
    const runner = new Function("console", code);
    const result = runner(customConsole);
    if (result !== undefined) {
      lines.push({ type: "log", text: String(result) });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    lines.push({ type: "error", text: message });
  }

  return lines;
};

export const CodeWorkspace = ({ exerciseId }: CodeWorkspaceProps) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<ConsoleLine[]>([]);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    setCode(getExerciseCode(exerciseId));
    setOutput([]);
    setHasRun(false);
  }, [exerciseId]);

  const handleRun = useCallback(() => {
    setOutput(runUserCode(code));
    setHasRun(true);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(getExerciseCode(exerciseId));
    setOutput([]);
    setHasRun(false);
  }, [exerciseId]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1e1e1e]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#2d2d2d] px-4 py-2">
        <span className="text-xs text-white/60">
          本地运行 · 无需联网 bundler
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
            aria-label="重置代码"
          >
            重置
          </button>
          <button
            type="button"
            onClick={handleRun}
            className="flex items-center gap-2 rounded-md bg-[var(--cc-yellow)] px-4 py-2 text-sm font-bold text-[var(--cc-navy)] hover:opacity-90"
            aria-label="运行代码"
          >
            <span aria-hidden>▶</span>
            运行代码
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden p-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="h-full w-full resize-none rounded border border-white/10 bg-[#1e1e1e] p-4 font-mono text-sm leading-relaxed text-white/90 outline-none focus:border-[var(--cc-yellow)]/50"
          aria-label="代码编辑器"
        />
      </div>

      <div className="flex max-h-[220px] min-h-[160px] shrink-0 flex-col border-t border-white/10">
        <div className="border-b border-white/10 bg-[#2d2d2d] px-3 py-1.5 text-xs font-medium text-white/80">
          输出
          {hasRun && output.length === 0 && (
            <span className="ml-2 font-normal text-white/50">
              （无输出，请确认代码里有 console.log）
            </span>
          )}
        </div>
        <pre className="flex-1 overflow-auto p-3 font-mono text-sm leading-relaxed text-white/90">
          {!hasRun && (
            <span className="text-white/40">
              点击「运行代码」后，console.log 会显示在这里
            </span>
          )}
          {output.map((line, i) => (
            <div
              key={`${line.type}-${i}`}
              className={
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "warn"
                    ? "text-yellow-300"
                    : "text-white/90"
              }
            >
              {line.text}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};
