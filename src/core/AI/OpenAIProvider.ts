import { OpenAI } from "openai"
import { OpenAIConfigSchema, OpenAIProviderConfig } from "../types.ts";
import { AIProvider } from "./AIProvider.ts";

/**
 * OpenAIProvider class for interacting with the OpenAI API.
 * 
 * @class OpenAIProvider
 * @description OpenAIProvider class for interacting with the OpenAI API.
 * @param {OpenAIProviderConfig} config - The configuration for the OpenAI provider.
 * @throws {z.ZodError} If the configuration is invalid.
 */
export class OpenAIProvider extends AIProvider {
  private client: OpenAI;

  constructor(config: OpenAIProviderConfig) {
    // Validate and parse the configuration using the schema
    const validatedConfig = OpenAIConfigSchema.parse({
      ...config,
      model: config.model || "gpt-3.5-turbo",
    })
    
    // Assign the validated configuration to the protected property
    super(validatedConfig);
    
    // Create an instance of the OpenAI client with the validated configuration
    this.client = new OpenAI({
      apiKey: validatedConfig.apiKey,
      baseURL: validatedConfig.baseURL,
      timeout: validatedConfig.timeout,
      maxRetries: validatedConfig.maxRetries
    })
  }
}