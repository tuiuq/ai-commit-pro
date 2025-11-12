import { OpenAI } from "openai"
import { AIMessage, AIResponse, OpenAIConfigSchema, OpenAIProviderConfig } from "../types.ts";
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
  
  public async sendMessage(
    messages: Array<AIMessage>
  ): Promise<AIResponse> {
    try {
      const validatedMessages = this.validateMessages(messages);
      
      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages: validatedMessages,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens
      })
      
      return {
        content: response.choices[0]?.message?.content || "",
        usage: {
          prompt_tokens: response.usage?.prompt_tokens,
          completion_tokens: response.usage?.completion_tokens,
          total_tokens: response.usage?.total_tokens,
        }
      }
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new Error(`OpenAI API error: ${error.status} - ${error.message}`, {
          cause: error
        })
      }
      throw new Error(`Failed to send message to OpenAI: ${(error as Error).message}`)
    }
  }
  
  public async sendMessageStream(
    message: Array<AIMessage>,
    onChunk: (chunk: string) => void
  ): Promise<AIResponse> {
    try {
      const validatedMessages = this.validateMessages(message);

      const stream = await this.client.chat.completions.create({
        model: this.config.model,
        messages: validatedMessages,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        stream: true
      })
      
      let fullContent = ""
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ""
        if (content) {
          fullContent += content
          onChunk(content)
        }
      }
      
      return {
        content: fullContent
      }
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new Error(`OpenAI API error: ${error.status} - ${error.message}`, {
          cause: error
        })
      }
      throw new Error(`Failed to send message to OpenAI: ${(error as Error).message}`)
    }
  }
}