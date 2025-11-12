import { Command } from "commander"
import pkg from "../package.json" with { type: "json" }
import generateCommand from "@/commands/generate";

async function main() {
  const program = new Command()
  
  program
    .name("ai-commit")
    .description("AI-powered git commit message generator using Moonshot API")
    .version(pkg.version, "-V, --version", 'show version')

  program.addCommand(generateCommand)

  if (process.argv.slice(2).length === 0) {
    program.outputHelp()
    process.exit(0)
  }
  
  await program.parseAsync(process.argv)
}

main().catch(error => {
  console.error("An error occurred:", error)
  process.exit(1)
})