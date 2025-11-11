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
  commit: z.boolean().default(false).describe("直接提交生成的信息"),
  prompt: z.string().optional().describe("包含自定义提示词的文件路径"),
  lang: z.enum(["en", "zh"]).default("en").describe("提交信息使用的语言"),
  verbose: z.boolean().default(false).describe("启用详细日志输出")
}) as ZodType<IGenerateOptions>;

generateCommand
  .name("generate")
  .alias("g")
  .description("使用 AI 生成 git 提交信息")
  .option("-c, --commit", "直接提交生成信息")
  .option("-p, --prompt <path>", "包含自定义提示词的文件路径")
  .option("-l, --lang <language>", "提交信息使用的语言", "en")
  .option("-v, --verbose", "启用详细日志输出")
  .action(async (options: IGenerateOptions) => {
    try {
      logger.setLevel(options.verbose ? "debug" : "info");

      logger.info("🚀 开始生成提交信息...")

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

      logger.debug("解析后的参数: ", {
        commit,
        prompt,
        lang,
        verbose
      })

      if (!isChanged()) {
        logger.error("没有需要提交的变更")
        return
      }

      logger.info("📝 分析代码变更")
      const changedFiles = getChangedFiles()
      const gitDiff = getGitDiff()

      logger.info(`📄 检测到 ${changedFiles.length} 个文件变更`)
      logger.debug("变更文件列表: ", changedFiles)
      logger.debug("Git diff 内容: ", gitDiff)


      logger.info("🔧 初始化 AI 服务...")
      const { client, model } = initializeOpenAI()
      logger.debug("OpenAI 配置: ", {
        model
      })

      const customContext = await loadCustomPrompt(prompt)

      logger.info("💭 构建提示词...")
      const { systemPrompt, userPrompt } = await buildPrompts({
        diff: gitDiff.join("\n"),
        files: changedFiles,
        lang,
        customContext
      })

      logger.debug("系统提示词: ", systemPrompt)
      logger.debug("用户提示词: ", userPrompt)

      logger.info("🤖 AI 正在生成提交信息...")
      const message = await generateCommitMessage(
        client,
        model,
        systemPrompt,
        userPrompt
      )

      handleOutput(message, commit)
    } catch (error) {
      logger.error("💥 生成提交信息时出错: ", (error as Error).message)
      process.exit(1)
    }
  })

export default generateCommand
