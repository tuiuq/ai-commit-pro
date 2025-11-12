import { Command } from "commander"
import * as console from "node:console";

const generateCommand = new Command()

generateCommand
  .command("generate")
  .description("使用 AI 生成Commit Message信息")
  .action(() => {
    console.log("使用 AI 获取Commit Message信息")
  })

export default generateCommand
