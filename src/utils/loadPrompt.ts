import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function loadPrompt(promptName: string) {
  const filePath = resolve(__dirname, `./prompts/${promptName}.md`)
  
  if (!existsSync(filePath)) {
    throw new Error(`Prompt file ${promptName} not found`)
  }
  
  return await readFile(filePath, "utf-8")
}