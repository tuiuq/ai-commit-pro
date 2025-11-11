import {parseEnv} from "@/utils/env.ts";
import z from "zod";
import OpenAI from "openai";

export function initializeOpenAI() {
  const env = parseEnv(
    z.object({
      OPENAI_API_KEY: z.string(),
      OPENAI_MODEL: z.string(),
      OPENAI_BASE_URL: z.string()
    })
  )

  const client = new OpenAI({
    baseURL: env.OPENAI_BASE_URL,
    apiKey: env.OPENAI_API_KEY,
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
      throw new Error("Failed to generate commit message: empty response from model.")
    }

    return message
  } catch (error) {
    throw new Error(`Error generating commit message from OpenAI: ${(error as Error).message}`, {
      cause: error
    })
  }
}
