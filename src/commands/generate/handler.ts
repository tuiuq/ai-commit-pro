import {commit} from "@/utils/simpleGit.ts";
import {logger} from "@/utils/Logger.ts";

export function handleOutput(message: string, shouldCommit: boolean) {
  if (shouldCommit) {
    try {
      logger.info("💾 正在提交变更...")
      commit(message)
      logger.info("✅ 变更提交成功！")
      return {
        committed: true,
        message
      }
    } catch (error) {
      logger.error("❌ 提交失败: ", (error as Error).message);
      logger.info("📝 生成的提交信息:")
      console.log(message)
      process.exit(1);
    }
  } else {
    logger.info("📝 生成的提交信息:")
    console.log(message)
    logger.info("💡 使用 -c 参数直接提交此信息, 或使用交互模式.")
    return {
      committed: false,
      message
    }
  }
}
