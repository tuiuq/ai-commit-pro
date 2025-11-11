import OpenAI from "openai";

export type Language = "en" | "zh";

export interface IGenerateOptions {
  commit: boolean;
  prompt?: string;
  lang: Language;
  verbose: boolean;
}

export interface InteractiveOptions {
  client: OpenAI;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  maxRetries?: number;
}

export type  CommitAction = "commit" | "regenerate" | "cancel";

export interface CommitChoice {
  action: CommitAction;
  message?: string;
}