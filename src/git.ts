import simpleGit, { type SimpleGit, type StatusResult } from "simple-git";

const git: SimpleGit = simpleGit()

export type StagedFile = {
  path: string;
  diff: string;
}

export async function getStagedFilesAndDiffs(): Promise<StagedFile[]> {
  const status: StatusResult = await git.status()

  const stagedPaths = status.staged
  const result: StagedFile[] = [];
  for (const p of stagedPaths) {
    const diff = await git.diff(["--cached", "--", p])
    result.push({
      path: p,
      diff
    })
  }

  return result;
}

export async function commitWithMessage(message: string, extraArgs: string[] = []) {
  if (extraArgs.length > 0) {
    await git.raw(["commit", ...extraArgs, "-m", message])
    return;
  }

  await git.commit(message)
}

export async function push(remote: string = "origin", branch: string = "main") {
  await git.push(remote, branch)
}

export async function getCurrentBranch(): Promise<string> {
  const branchSummary = await git.branch()
  return branchSummary.current
}
