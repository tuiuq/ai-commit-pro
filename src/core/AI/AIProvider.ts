import {
  AIMessage,
  AIMessageSchema,
  AIProviderConfig,
  AIProviderConfigSchema,
  AIResponse,
  AIResponseSchema
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
  
  /**
   * Sends a message to the AI provider and returns the response.
   * 
   * @abstract
   * @method sendMessage
   * @description Sends a message to the AI provider and returns the response.
   * @param {Array<AIMessage>} messages - The messages to send to the AI provider.
   * @returns {Promise<AIResponse>} A promise that resolves to the AI response.
   */
  public abstract sendMessage(
    messages: Array<AIMessage>
  ): Promise<AIResponse>;
  
  /**
   * Sends a message to the AI provider and streams the response.
   * 
   * @abstract
   * @method sendMessageStream
   * @description Sends a message to the AI provider and streams the response.
   * @param {Array<AIMessage>} message - The message to send to the AI provider.
   * @param {function(string): void} onChunk - The callback function to handle each chunk of the response.
   * @returns {Promise<AIResponse>} A promise that resolves to the AI response.
   */
  public abstract sendMessageStream(
    message: Array<AIMessage>,
    onChunk: (chunk: string) => void,
  ): Promise<AIResponse>;


  /**
   * Validates the messages array.
   * 
   * @protected
   * @param {unknown} messages - The messages to validate.
   * @returns {Array<AIMessage>} The validated messages array.
   */
  protected validateMessages(messages: unknown): Array<AIMessage> {
    return AIMessageSchema.array().parse(messages);
  }
  
  /**
   * Validates the AI response.
   * 
   * @protected
   * @param {unknown} response - The response to validate.
   * @returns {AIResponse} The validated AI response.
   */
  protected validateResponse(response: unknown): AIResponse {
    return AIResponseSchema.parse(response);
  }
  
  /**
   * Sets the model to use for the AI provider.
   * 
   * @param model - The model to use for the AI provider. 
   */
  public setModel(model: string) {
    this.config.model = model;
  }
  
  /**
   * Sets the temperature to use for the AI provider.
   * 
   * @param temperature - The temperature to use for the AI provider.
   */
  public setTemperature(temperature: number) {
    this.config.temperature = temperature;
  }
  
  /**
   * Sets the maximum number of tokens to use for the AI provider.
   * 
   * @param maxTokens - The maximum number of tokens to use for the AI provider.
   */
  public setMaxTokens(maxTokens: number) {
    this.config.maxTokens = maxTokens;
  }
}