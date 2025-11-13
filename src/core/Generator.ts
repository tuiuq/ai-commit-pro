import { parseEnv } from "@/utils/env.ts";
import { OpenAIProvider } from "./AI/OpenAIProvider.ts";
import { AdvancedGitOperator } from "./Git/AdvancedGitOperator.ts";
import z from "zod";

export class Generator {
  private readonly git: AdvancedGitOperator;
  private readonly client: OpenAIProvider;
  
  constructor() {
    const env = parseEnv(z.object({
      OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required").describe("OpenAI API key"),
      OPENAI_BASE_URL: z.url().min(1, "OPENAI_BASE_URL is required").describe("OpenAI base URL"),
      OPENAI_MODEL: z.string().min(1, "OPENAI_MODEL is required").describe("OpenAI model"),
    }))

    this.git = new AdvancedGitOperator();
    this.client = new OpenAIProvider({
      apiKey: env.OPENAI_API_KEY,
      baseURL: env.OPENAI_BASE_URL,
      model: env.OPENAI_MODEL,
    });
  }
}