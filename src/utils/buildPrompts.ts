import { loadPrompt } from "./loadPrompt.ts";
import { PromptTemplate } from "./Template.ts";

interface PromptData {
  diff: string;
  files?: string[];
  customContext?: string;
  lang?: "en" | "zh" | string;
}

export async function buildPrompts(data: PromptData) {
  data.lang = data.lang || "en";
  data.lang = data.lang === "en" ? "英文" : "中文"
  const systemPrompt = await loadPrompt("system")
  const userTemplate = await loadPrompt("user")
  const userPrompt = new PromptTemplate(userTemplate, data).toString()
  
  return {
    systemPrompt,
    userPrompt
  }
}