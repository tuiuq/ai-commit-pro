import { Command } from "commander";
import pkg from "../package.json"

async function main() {
  const program = new Command()

  program
    .name("ai-commit")
    .description("Use Moonshot AI to generate git commit messages")
    .version(pkg.version, "-V, --version")

  if (process.argv.slice(2).length === 0) {
    program.outputHelp()
    return
  }

  program.parse(process.argv)
}

main().catch(e => {
  console.error('An error occurred: ', e)
  process.exit(1)
})
