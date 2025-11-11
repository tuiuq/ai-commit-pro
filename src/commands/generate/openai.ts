import {parseEnv} from "@/utils/env.ts";
import z from "zod";
import OpenAI from "openai";
import {logger} from "@/utils/Logger.ts";

export function initializeOpenAI() {
  const env = parseEnv(
    z.object({
      OPENAI_API_KEY: z.string().min(1).describe("OPENAI_API_KEY 是必需的"),
      OPENAI_MODEL: z.string(),
      OPENAI_BASE_URL: z.string().url().describe("OPENAI_BASE_URL 必需是有效的 URL")
    })
  )

  logger.debug("初始化 OpenAI 客户端", {
    baseURL: env.OPENAI_BASE_URL,
    model: env.OPENAI_MODEL
  });
  const client = new OpenAI({
    baseURL: env.OPENAI_BASE_URL,
    apiKey: env.OPENAI_API_KEY,
    timeout: 30 * 1000
  })

  return {
    client,
    model: env.OPENAI_MODEL
  }
}

export async function generateCommitMessage(
  client: OpenAI,
  model: string,
  systemPrompt: string,
  userPrompt: string,
) {
  try {
    logger.debug("发送 OpenAI API 请求", {
      model,
      temperature: 0.7
    })
    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        }
      ],
      temperature: 0.7
    })

    const message = completion.choices[0]?.message?.content ?? "";

    if (!message) {
      throw new Error("AI 返回了空响应")
    }

    logger.debug("OpenAI API 响应", {
      usage: completion.usage,
      finishReason: completion.choices[0]?.finish_reason
    })
    return message
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      logger.error("OpenAI API 错误", {
        status: error.status,
        code: error.code,
        message: error.message
      })
      throw new Error(`AI 服务错误: ${(error as Error).message}`, {
        cause: error
      })
    }
    logger.error("生成提交信息失败: ", {
      error: error instanceof Error ? error.message : error
    })
    throw new Error(`生成提交信息失败: ${(error as Error).message}`, {
      cause: error
    })
  }
}
