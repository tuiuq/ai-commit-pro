import {commit} from "@/utils/simpleGit.ts";

export function handleOutput(message: string, shouldCommit: boolean) {
  if (shouldCommit) {
    console.log(message)
    const result = commit(message)
    console.log(result)
    console.log("Changes committed successfully.")
  } else {
    console.error(message)
  }
}