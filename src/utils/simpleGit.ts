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