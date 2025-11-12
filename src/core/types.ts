import z from "zod";

export const AIProviderConfigSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  baseURL: z.url().describe("Base URL of the AI provider API"),
  model: z.string().min(1, "Model is required"),
  temperature: z.number().min(0).max(1).default(0.7).optional().describe("Temperature for model inference"),
  maxTokens: z.number().positive().optional().describe("Maximum number of tokens to generate"),
})

export type AIProviderConfig = z.infer<typeof AIProviderConfigSchema>