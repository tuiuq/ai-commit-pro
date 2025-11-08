import {resolve} from "node:path";
import {readFile} from "node:fs/promises";

export async function loadCustomPrompt(
  promptPath?: string
) {
  if (!promptPath) {
    return undefined;
  }

  try {
    const customPromptPath = resolve(promptPath)
    return await readFile(customPromptPath, "utf8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      console.error(
        `The file at path "${resolve(promptPath)}" was not found.`
      );
    } else {
      console.error(err)
    }

    process.exit(1)
  }
}
