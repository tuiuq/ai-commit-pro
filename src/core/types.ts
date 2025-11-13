import z from "zod";

export const AIMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string().min(1, "Content is required"),
})

export const AIUsageSchema = z.object({
  prompt_tokens: z.number().int().positive().optional(),
  completion_tokens: z.number().int().positive().optional(),
  total_tokens: z.number().int().positive().optional(),
}).optional();

export const AIResponseSchema = z.object({
  content: z.string(),
  usage: AIUsageSchema
})

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

export const EnvironmentSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required").describe("OpenAI API key"),
  OPENAI_BASE_URL: z.url().min(1, "OPENAI_BASE_URL is required").describe("OpenAI base URL"),
  OPENAI_MODEL: z.string().min(1, "OPENAI_MODEL is required").describe("OpenAI model"),
})

export type AIMessage = z.infer<typeof AIMessageSchema>
export type AIResponse = z.infer<typeof AIResponseSchema>
export type AIUsage = z.infer<typeof AIUsageSchema>
export type AIProviderConfig = z.infer<typeof AIProviderConfigSchema>
export type OpenAIProviderConfig = z.infer<typeof OpenAIConfigSchema>
export type Environment = z.infer<typeof EnvironmentSchema>