import z from "zod";

export const AIProviderConfigSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  baseURL: z.url().describe("Base URL of the AI provider API"),
  model: z.string().min(1, "Model is required"),
  temperature: z.number().min(0).max(1).default(0.7).optional().describe("Temperature for model inference"),
  maxTokens: z.number().positive().optional().describe("Maximum number of tokens to generate"),
})

export const OpenAIConfigSchema = AIProviderConfigSchema.extend({
  timeout: z.number().positive().default(30 * 1000).optional().describe("The timeout in milliseconds for requests to the OpenAI API."),
  maxRetries: z.number().int().min(0).max(5).default(5).optional().describe("The maximum number of retries for requests to the OpenAI API.")
})

export type AIProviderConfig = z.infer<typeof AIProviderConfigSchema>
export type OpenAIProviderConfig = z.infer<typeof OpenAIConfigSchema>