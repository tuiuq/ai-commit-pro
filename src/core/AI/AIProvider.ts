import {
  AIProviderConfig,
  AIProviderConfigSchema
} from "@core/types.ts";

/**
 * Base class for AI providers.
 * 
 * @abstract 
 * @class AIProvider
 * @description Base class for AI providers.
 * @param {AIProviderConfig} config - The configuration for the AI provider.
 * @throws {z.ZodError} If the configuration is invalid.
 */
export abstract class AIProvider {
  protected config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    // Validate and parse the configuration using the schema
    const validatedConfig = AIProviderConfigSchema.parse(config);
    // Assign the validated configuration to the protected property
    this.config = validatedConfig;
  }
}