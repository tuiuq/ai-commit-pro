import {execSync, spawnSync} from "node:child_process";
import { resolve } from "node:path";

export function getTopLevel() {
  return execSync("git rev-parse --show-toplevel", { encoding: "utf-8" }).trim()
}

export function getChangedFiles(): string[] {
  return execSync("git diff --cached --name-only", { encoding: "utf-8" }).split("\n").filter(file => file.trim() !== "")
}

export function getGitDiffWithFile(file: string): string {
  return execSync(`git diff --cached "${resolve(getTopLevel(), file)}"`, { encoding: "utf-8" }).trim()
}

export function getGitDiff(): string[] {
  return getChangedFiles().map(getGitDiffWithFile)
}

export function isChanged() {
  return getGitDiff().length > 0
}

export function commit(message: string) {
  if (message.trim()) {
    return;
  }

  const cleanMessage = message.trim();

  const result = spawnSync("git", ["commit", "-m", cleanMessage], {
    encoding: "utf-8",
    stdio: "inherit",
  })

  if (result.error) {
    console.error("Git commit failed: ", result.error.message);
    throw result.error;
  }

  return result.stdout;
}
