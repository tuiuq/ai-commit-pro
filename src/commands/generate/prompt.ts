import {resolve} from "node:path";
import {readFile} from "node:fs/promises";

export async function loadCustomPrompt(
  promptPath?: string
) {
  if (!promptPath) {
    return undefined;
  }

  const customPromptPath = resolve(promptPath)
  try {
    return await readFile(customPromptPath, "utf8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      throw new Error(`Custom prompt file not found at path "${customPromptPath}": ${(err as Error).message}`,
        {
          cause: err
        }
      )
    }
    throw err
  }
}
