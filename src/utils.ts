import { type StagedFile } from "./git"

export function buildPrompt(staged: StagedFile[]) {
  // 这是一个通用的 prompt：把文件路径 + diff 加上希望的格式告诉模型
  const header = `You are an assistant that writes concise, conventional commit-style git commit messages.`;
  const instructions = `Please produce a short commit title (<= 50 chars) and a detailed body (wrap at ~72 chars) if needed. Use present-tense imperative style. Do NOT include file diffs in the commit message. Provide only the commit message (title and body).`;

  const diffs = staged
    .map((s) => {
      const snippet = s.diff.length > 1000 ? s.diff.slice(0, 1000) + "..." : s.diff;
      return `File: ${s.path}\nDiff:\n${snippet}`
    })
    .join("\n\n---\n\n")

  return `${header}\n\n${instructions}\n\nChanges:\n\n${diffs}\n\nReturn only the commit message (title and optional body).`;
}