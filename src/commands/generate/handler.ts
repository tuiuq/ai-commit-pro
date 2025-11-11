import {commit} from "@/utils/simpleGit.ts";

export function handleOutput(message: string, shouldCommit: boolean) {
  if (shouldCommit) {
    commit(message)
    console.log("Changes committed successfully.")
    return {
      committed: true,
      message
    }
  } else {
    console.error(message)
    return {
      committed: false,
      message
    }
  }
}
