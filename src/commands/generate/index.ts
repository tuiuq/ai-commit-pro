import { Command } from "commander"
import { buildPrompts } from "@/utils/buildPrompts.ts"
import { getChangedFiles, getGitDiff, isChanged } from "@/utils/simpleGit.ts"
import {generateCommitMessage, initializeOpenAI} from "@/commands/generate/openai.ts";
import {loadCustomPrompt} from "@/commands/generate/prompt.ts";
import {handleOutput} from "@/commands/generate/handler.ts";
import {IGenerateOptions} from "@/commands/generate/types.ts";

const generateCommand = new Command()

generateCommand
  .name("generate")
  .alias("g")
  .description("Generate a git commit message using AI")
  .option("-c, --commit", "Directly commit the generated message")
  .option("-p, --prompt <path>", "Path to a file containing custom prompt instructions")
  .option("-l, --lang <language>", "Language to use for the commit message")
  .action(async ({ commit = false, prompt, lang = "en" }: IGenerateOptions) => {
    if (!isChanged()) {
      console.error("No changes to commit.")
      return
    }

    const { client, model } = initializeOpenAI()
    const customContext = await loadCustomPrompt(prompt)

    const { systemPrompt, userPrompt } = await buildPrompts({
      diff: getGitDiff().join("\n"),
      files: getChangedFiles(),
      lang,
      customContext
    })

    const message = await generateCommitMessage(
      client,
      model,
      systemPrompt,
      userPrompt
    )

    handleOutput(message, commit)
  })

export default generateCommand
