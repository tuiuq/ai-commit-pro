import { Command } from "commander"
import { parseEnv } from "@/utils/env.ts"
import z from "zod"

const generateCommand = new Command()

generateCommand
  .name("generate")
  .alias("g")
  .description("Generate a git commit message using AI")
  .action(async () => {
    console.log("Generating git commit message using AI...")
    const env = parseEnv(z.object({
      OPENAI_API_KEY: z.string(),
      OPENAI_MODEL: z.string(),
      OPENAI_BASE_URL: z.string(),
    }))
    console.log(env)
  })

export default generateCommand