import {commit} from "@/utils/simpleGit.ts";
import {logger} from "@/utils/Logger.js";

export function handleOutput(message: string, shouldCommit: boolean) {
  if (shouldCommit) {
    try {
      logger.info("💾 Submitting changes...")
      commit(message)
      logger.info("✅ Changes submitted successfully！")
      return {
        committed: true,
        message
      }
    } catch (error) {
      logger.error("❌ Submission failed: ", (error as Error).message);
      logger.info("📝 generated commit message:")
      console.log(message)
      process.exit(1);
    }
  } else {
    logger.info("📝 generated commit message:")
    console.log(message)
    logger.info("💡 Submit this message directly using the -c parameter.")
    return {
      committed: false,
      message
    }
  }
}
