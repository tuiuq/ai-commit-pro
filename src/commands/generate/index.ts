import { Command } from "commander"
import { buildPrompts } from "@/utils/buildPrompts.ts"
import { getChangedFiles, getGitDiff, isChanged } from "@/utils/simpleGit.ts"
import {generateCommitMessage, initializeOpenAI} from "@/commands/generate/openai.ts";
import {loadCustomPrompt} from "@/commands/generate/prompt.ts";
import {handleOutput} from "@/commands/generate/handler.ts";
import {IGenerateOptions} from "@/commands/generate/types.ts";
import z, {ZodType} from "zod";
import {logger} from "@/utils/Logger.ts";

const generateCommand = new Command()

const schema = z.object({
  commit: z.boolean().default(false).describe("Directly commit the generated message"),
  prompt: z.string().optional().describe("Path to a file containing custom prompt instructions"),
  lang: z.enum(["en", "zh"]).default("en").describe("Language to use for the commit message"),
  verbose: z.boolean().default(false).describe("Verbose output")
}) as ZodType<IGenerateOptions>;

generateCommand
  .name("generate")
  .alias("g")
  .description("Generate a git commit message using AI")
  .option("-c, --commit", "Directly commit the generated message")
  .option("-p, --prompt <path>", "Path to a file containing custom prompt instructions")
  .option("-l, --lang <language>", "Language to use for the commit message", "en")
  .option("-v, --verbose", "Verbose output")
  .action(async (options: IGenerateOptions) => {
    try {
    const parsedOptions = schema.safeParse(options);
    if (parsedOptions.error) {
      throw parsedOptions.error;
    }
    const {
      commit,
      prompt,
      lang,
      verbose
    } = parsedOptions.data;

    logger.setLevel(verbose ? "debug" : "info");

    logger.info("🚀 Start generating commit messages...")

    if (!isChanged()) {
      logger.error("No changes need to be submitted.")
      return
    }

    logger.info("📝 Analyze code changes...")
    const changedFiles = getChangedFiles()
    const gitDiff = getGitDiff()

    logger.info(`📄 ${changedFiles.length} file changes detected`)

    logger.info("🔧 Initialize AI service...")
    const { client, model } = initializeOpenAI()

    const customContext = await loadCustomPrompt(prompt)

    logger.info("💭 Build prompt words...")
    const { systemPrompt, userPrompt } = await buildPrompts({
      diff: gitDiff.join("\n"),
      files: changedFiles,
      lang,
      customContext
    })

    logger.info("🤖 AI is generating submission information...")
    const message = await generateCommitMessage(
      client,
      model,
      systemPrompt,
      userPrompt
    )

    handleOutput(message, commit)
    } catch (error) {
      logger.info("💥 Error occurred while generating submission information: ", (error as Error).message)
      process.exit(1)
    }
  })

export default generateCommand
