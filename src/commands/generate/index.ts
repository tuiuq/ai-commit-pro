import { Generator } from "@core/Generator.ts";
import { EnvironmentSchema } from "@core/types.ts";
import { Command } from "commander"

const generateCommand = new Command()

generateCommand
  .name("generate")
  .alias("g")
  .description("使用 AI 生成Commit Message信息")
  .action(() => {
    const generate = new Generator(EnvironmentSchema.parse(process.env))
  })

export default generateCommand
