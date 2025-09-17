import { Command } from "commander";
import pkg from "../package.json"

const program = new Command()

program
  .name("ai-commit")
  .description("Use Moonshot AI to generate git commit messages")
  .version(pkg.version, "-V, --version")

if (process.argv.slice(2).length === 0) {
  program.outputHelp()
  process.exit(1)
}

program.parse(process.argv)
