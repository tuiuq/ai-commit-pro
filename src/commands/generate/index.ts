import { Command } from "commander"
import { parseEnv } from "@/utils/env.ts"
import z from "zod"
import OpenAI from "openai"
import { buildPrompts } from "@/utils/buildPrompts.ts"
import { getChangedFiles, getGitDiff, isChanged } from "@/utils/simpleGit.ts"

const generateCommand = new Command()

generateCommand
  .name("generate")
  .alias("g")
  .description("Generate a git commit message using AI")
  .option("-c, --commit", "Directly commit the generated message")
  .option("-p, --prompt <path>", "Path to a file containing custom prompt instructions")
  .action(async ({ commit = false, prompt }) => {
    if (!isChanged()) {
      console.error("No changes to commit.")
      return
    }
    
    const env = parseEnv(z.object({
      OPENAI_API_KEY: z.string(),
      OPENAI_MODEL: z.string(),
      OPENAI_BASE_URL: z.string(),
    }))
    const client = new OpenAI({
      baseURL: env.OPENAI_BASE_URL,
      apiKey: env.OPENAI_API_KEY,
    })
    
    const { systemPrompt, userPrompt } = await buildPrompts({
      diff: getGitDiff().join("\n"),
      files: getChangedFiles(),
      lang: "en"
    })
    
    const completion = await client.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    })
    
    const message = completion.choices[0]?.message.content;
    
    if (!message) {
      console.error("Failed to generate commit message.")
      return
    }
    
    if (commit) {
      commit(message)
      console.log("Changes committed successfully!")
    } else {
      console.log(message)
    }
  })

export default generateCommand