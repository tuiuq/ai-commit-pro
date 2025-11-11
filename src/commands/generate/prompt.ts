import {resolve} from "node:path";
import {readFile} from "node:fs/promises";
import {logger} from "@/utils/Logger.ts";

export async function loadCustomPrompt(
  promptPath?: string
) {
  if (!promptPath) {
    logger.debug("未提供自定义提示词文件路径")
    return undefined;
  }

  const customPromptPath = resolve(promptPath)
  try {
    logger.info("📁 加载自定义提示词: ", customPromptPath)
    const content = await readFile(customPromptPath, "utf8")

    if (!content.trim()) {
      throw new Error("自定义提示词文件为空")
    }

    logger.info("✅ 自定义提示词加载成功")
    logger.debug("自定义提示词内容: ", content)
    return content;
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      logger.error(`自定义提示词文件不存在: ${customPromptPath}`)
      throw new Error(`自定义提示词文件不存在: "${customPromptPath}": ${(err as Error).message}`,
        {
          cause: err
        }
      )
    }
    if (err instanceof Error && err.message.includes("空")) {
      logger.error("自定义提示词文件为空")
      throw new Error("自定义提示词文件为空", {
        cause: err
      })
    }
    logger.error("加载自定义提示词失败: ", (err as Error).message)
    throw new Error(`加载自定义提示词失败: ${(err as Error).message}`, {
      cause: err
    })
  }
}
