import { Generator } from "@core/Generator.ts";
import { EnvironmentSchema } from "@core/types.ts";
import { Command } from "commander"
import { GenerateOptions } from "./types.ts";
import { logger } from "@/utils/Logger.ts";

const generateCommand = new Command()

const env = EnvironmentSchema.parse(process.env)

generateCommand
  .name("generate")
  .alias("g")
  .description("使用 AI 生成Commit Message信息")
  .option("-l, --lang <language>", "指定生成的Commit Message语言", "zh")
  .option("-v, --verbose", "显示详细信息", false)
  .action(async (options: GenerateOptions) => {
    if (options.verbose) {
      logger.setLevel("debug")
    }

    logger.debug("options", options)
    logger.debug("env: ", {
      model: env.OPENAI_MODEL,
      baseURL: env.OPENAI_BASE_URL,
    })
    const generator = new Generator(env)
    
  })

export default generateCommand
