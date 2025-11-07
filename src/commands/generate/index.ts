import { Command } from "commander"

const generateCommand = new Command()

generateCommand
  .name("generate")
  .alias("g")
  .description("Generate a git commit message using AI")
  .action(async () => {
    console.log("Generating git commit message using AI...")
  })

export default generateCommand