export type Language = "en" | "zh";

export interface IGenerateOptions {
  commit: boolean;
  prompt?: string;
  lang: Language;
}