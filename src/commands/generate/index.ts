import { Generator } from "@core/Generator.ts";
import { EnvironmentSchema } from "@core/types.ts";
import { Command } from "commander"
import { GenerateOptions } from "./types.ts";

const generateCommand = new Command()

generateCommand
  .name("generate")
  .alias("g")
  .description("使用 AI 生成Commit Message信息")
  .option("-l, --lang <language>", "指定生成的Commit Message语言", "zh")
  .option("-v, --verbose", "显示详细信息")
  .action((options: GenerateOptions) => {
    const generator = new Generator(EnvironmentSchema.parse(process.env))
  })

export default generateCommand
