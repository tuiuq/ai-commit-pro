import OpenAI from "openai";
import {InteractiveCommitService} from "@/commands/generate/interactive.ts";
import {handleOutput} from "@/commands/generate/handler.ts";
import {logger} from "@/utils/Logger.ts";

export async function runInteractiveMode(
  client: OpenAI,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<void> {
  const interactiveService = new InteractiveCommitService({
    client,
    model,
    systemPrompt,
    userPrompt,
    maxRetries: 3
  })

  const result = await interactiveService.start()

  switch (result.action) {
    case "commit":
      if (result.message) {
        handleOutput(result.message, true)
      }
      break;
    case "cancel":
      logger.info("👋 已取消提交")
      break;
  }
}