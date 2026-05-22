export type ExerciseConfig = {
  files: Record<string, string>;
  template: string;
  activeFile: string;
};

/** Sandpack vanilla 模板需要 /index.js 作为入口，否则无法运行 */
const buildSandpackFiles = (code: string): Record<string, string> => ({
  "/index.js": code,
  "/index.html": `<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8" /><title>练习</title></head>
  <body>
    <script src="index.js"></script>
  </body>
</html>`,
  "/package.json": JSON.stringify({ main: "/index.js", dependencies: {} }, null, 2),
});

const exploreExercise = `// 修改下面变量，点击顶部「运行代码」查看输出
const temperature = 0.7;
const userMessage = "用一句话解释 React 中的 useEffect";

const messages = [
  { role: "system", content: "你是资深前端工程师" },
  { role: "user", content: userMessage },
];

console.log("=== Chat 请求预览 ===");
console.log("temperature:", temperature);
console.log("messages:", JSON.stringify(messages, null, 2));
console.log("\\n提示：temperature 越低输出越稳定");
`;

const tokensExercise = `function estimateTokens(text) {
  // 粗略估算：英文约 4 字符/token，中文约 1.5 字/token
  const cjk = (text.match(/[\\u4e00-\\u9fff]/g) || []).length;
  const other = text.length - cjk;
  return Math.ceil(other / 4 + cjk * 1.5);
}

const sampleCode = \`export const ChatInput = () => {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}\`;

console.log("字符数:", sampleCode.length);
console.log("估算 Token:", estimateTokens(sampleCode));
console.log("\\n加长 sampleCode 后再点「运行代码」");
`;

const fetchExercise = `const userMessage = "Hello from AI Frontend Engineer path!";

// 真实项目用 async + fetch("/api/chat")；本地练习用同步模拟
function mockChatRequest() {
  const response = {
    id: "chatcmpl-mock",
    choices: [{ message: { role: "assistant", content: "你好！这是模拟响应。" } }],
    usage: { prompt_tokens: 24, completion_tokens: 12, total_tokens: 36 },
  };

  console.log("POST /api/chat");
  console.log("user:", userMessage);
  console.log("response:", JSON.stringify(response, null, 2));
}

mockChatRequest();
`;

const promptExercise = `const systemPrompt = \`你是代码审查助手，用中文简洁回答。\`;

const fewShotExamples = [
  { input: "<div onclick={fn}>", output: "1. 改用 button 2. 添加键盘支持" },
  { input: "<img src=x>", output: "1. 补充 alt 2. 考虑 next/image" },
];

const userCode = "<button onclick='submit()'>OK</button>";

console.log("System:", systemPrompt);
console.log("Few-shot 示例数:", fewShotExamples.length);
console.log("待审查代码:", userCode);
console.log("\\n模拟输出: 改用 onClick；添加 type='button'；考虑 aria-label");
`;

const jsonExercise = `const raw = \`{
  "title": "今日任务",
  "items": [
    { "label": "完成 API 调用", "done": true },
    { "label": "阅读 Token 文档", "done": false }
  ]
}\`;

function parseTasks(raw) {
  const data = JSON.parse(raw);
  if (!data.title || !Array.isArray(data.items)) {
    throw new Error("Schema 不匹配");
  }
  return data;
}

try {
  const result = parseTasks(raw);
  console.log("解析成功:", result);
  console.log("未完成:", result.items.filter((i) => !i.done).length);
} catch (e) {
  console.error("解析失败 — UI 应提示重试:", e.message);
}

// 取消下面注释测试错误处理
// parseTasks("{ invalid");
`;

const exercises: Record<string, ExerciseConfig> = {
  explore: {
    files: buildSandpackFiles(exploreExercise),
    template: "vanilla",
    activeFile: "/index.js",
  },
  tokens: {
    files: buildSandpackFiles(tokensExercise),
    template: "vanilla",
    activeFile: "/index.js",
  },
  fetch: {
    files: buildSandpackFiles(fetchExercise),
    template: "vanilla",
    activeFile: "/index.js",
  },
  prompt: {
    files: buildSandpackFiles(promptExercise),
    template: "vanilla",
    activeFile: "/index.js",
  },
  json: {
    files: buildSandpackFiles(jsonExercise),
    template: "vanilla",
    activeFile: "/index.js",
  },
};

export const getExercise = (exerciseId: string): ExerciseConfig =>
  exercises[exerciseId] ?? exercises.explore;

/** 编辑器初始代码（/index.js 内容） */
export const getExerciseCode = (exerciseId: string): string => {
  const exercise = getExercise(exerciseId);
  return exercise.files["/index.js"] ?? "";
};
