import {CommitChoice, InteractiveOptions} from "@/commands/generate/types.ts";
import {logger} from "@/utils/Logger.ts";
import {generateCommitMessage} from "@/commands/generate/openai.ts";
import inquirer from "inquirer";

export class InteractiveCommitService {
  private retryCount = 0;
  private readonly maxRetries: number = 3;

  constructor(
    private options: InteractiveOptions
  ) {
    const { maxRetries } = this.options;

    this.maxRetries = maxRetries || 3;
  }

  public async start(): Promise<CommitChoice> {
    while (this.retryCount <= this.maxRetries) {
      try {
        const message = await this.generateMessage();

        const choice = await this.promptUserChoice(message);

        switch (choice.action) {
          case "commit":
            return choice;
          case "regenerate":
            this.retryCount++;
            logger.info(`🔄 重新生成提交信息 (${this.retryCount}/${this.options.maxRetries || 3})`)
            continue;
          case "cancel":
            return {
              action: "cancel"
            }
        }
      } catch (error) {
        logger.error("❌ 交互流程出错: ", error instanceof Error ? error.message : error);
        const shouldRetry = await this.promptRetry()
        if (!shouldRetry) {
          return {
            action: "cancel"
          }
        }

        this.retryCount++;
      }
    }
    logger.warn("⚠️ 已达到最大重试次数，退出流程")
    return {
      action: "cancel"
    }
  }

  private async generateMessage(): Promise<string> {
    logger.info("🤖 AI 正在生成提交信息...")
    return await generateCommitMessage(
      this.options.client,
      this.options.model,
      this.options.systemPrompt,
      this.options.userPrompt,
    )
  }

  private async promptUserChoice(message: string): Promise<CommitChoice> {
    console.log("\n📝 生成的提交信息:")
    console.log("=".repeat(60))
    console.log(message)
    console.log("=".repeat(60))

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "请选择操作: ",
        choices: [
          {
            name: "✅ 提交此信息",
            value: "commit"
          },
          {
            name: "🔄 重新生成",
            value: "regenerate"
          },
          {
            name: "❌ 取消",
            value: "cancel"
          }
        ]
      }
    ])

    return {
      action,
      message
    }
  }

  private async promptRetry(): Promise<boolean> {
    const { retry } = await inquirer.prompt([
      {
        type: "confirm",
        name: "retry",
        message: "是否重试?",
        default: true
      }
    ])
    return retry
  }
}
