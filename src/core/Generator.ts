import { OpenAIProvider } from "./AI/OpenAIProvider.ts";
import { AdvancedGitOperator } from "./Git/AdvancedGitOperator.ts";
import { Environment } from "./types.ts";

export class Generator {
  private readonly git: AdvancedGitOperator;
  private readonly client: OpenAIProvider;
  
  constructor(env: Environment) {
    this.git = new AdvancedGitOperator();
    this.client = new OpenAIProvider({
      apiKey: env.OPENAI_API_KEY,
      baseURL: env.OPENAI_BASE_URL,
      model: env.OPENAI_MODEL,
    });
  }
}