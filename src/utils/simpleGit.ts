import { execSync } from "node:child_process";

export function getChangedFiles(): string[] {
  return execSync("git diff --cached --name-only", { encoding: "utf-8" }).split("\n").filter(file => file.trim() !== "")
}

export function getGitDiffWithFile(file: string): string {
  return execSync(`git diff --cached "${file}"`, { encoding: "utf-8" }).trim()
}

export function getGitDiff(): string[] {
  return getChangedFiles().map(getGitDiffWithFile)
}

export function isChanged() {
  return getGitDiff().length > 0
}

export function commit(message: string) {
  const lines = message
    .split("\n")
    .filter(line => line.trim() !== "")
  if (lines.length === 0) {
    return;
  }
  const command = lines
    .map(line => `-m "${line.replace(/"/g, '\\"')}"`)
    .join(" ");
  execSync(`git commit ${command}`, { encoding: "utf-8" })
}