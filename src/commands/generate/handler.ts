import {commit} from "@/utils/simpleGit.js";

export function handleOutput(message: string, shouldCommit: boolean) {
  if (shouldCommit) {
    commit(message)
    console.log("Changes committed successfully.")
  } else {
    console.error(message)
  }
}