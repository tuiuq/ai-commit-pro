import {resolve} from "node:path";
import {readFile} from "node:fs/promises";
import {logger} from "@/utils/Logger.js";

export async function loadCustomPrompt(
  promptPath?: string
) {
  if (!promptPath) {
    return undefined;
  }

  const customPromptPath = resolve(promptPath)
  try {
    logger.info("📁 Load custom prompts: ", customPromptPath)
    const content = await readFile(customPromptPath, "utf8")

    if (!content.trim()) {
      throw new Error("The custom prompt file is empty.")
    }

    logger.info("✅ Custom prompt words loaded successfully")
    return content;
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
