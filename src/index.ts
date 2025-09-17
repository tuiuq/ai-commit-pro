import { Command } from "commander";
import pkg from "../package.json"
import {commitWithMessage, getCurrentBranch, getStagedFilesAndDiffs, push} from "./git.ts";
import {buildPrompt} from "./utils.ts";
import {generateCommitMessage} from "./providers/moonshot.ts";

async function main() {
  const program = new Command()

  program
    .name("ai-commit")
    .description("Use Moonshot AI to generate git commit messages")
    .version(pkg.version, "-V, --version")

  program
    .option("-d, --dry-run", "only show generated commit message, do not commit")
    .option("-a, --amend", "use --amend when committing")
    .option("-p, --push", "push after commit")
    .option("-b, --branch <branch>", "branch to push to (overrides env)", process.env.DEFAULT_BRANCH)
    .option("-r, --remote <remote>", "remote to push to (overrides env)", process.env.DEFAULT_REMOTE)
    .option("-s, --staged-only", "only include staged files into prompt (default true)", true)
    .option("--no-color", "disable color output")
    .option("-t, --temperature <n>", "AI generation temperature (0-1)", parseFloat, 0.2)
    .action(async (options) => {
      try {
        console.log("ai-commit: analyzing staged changes...")

        const staged = await getStagedFilesAndDiffs()
        if (staged.length === 0) {
          console.warn("No staged changes detected. Please `git add` the files first.")
          process.exit(1)
        }

        const prompt = buildPrompt(staged);
        console.debug("Prompt preview: \n", prompt.split("\n").slice(0, 20).join("\n"))
        console.log("Requesting Moonshot AI to generate a commit message...")

        const message = await generateCommitMessage(prompt, { temperature: options.termperature })

        console.log("\nAI suggested commit message:\n")
        console.log(message)
        console.log()

        if (options.dryRun) {
          console.log("Dry-run mode, no git commit is performed.")
          process.exit(0)
        }

        const commitArgs: string [] = []

        if (options.amend) {
          commitArgs.push("--amend", "--no-edit")
        }

        await commitWithMessage(message, options.amend ? ["--amend", "--no-edit"] : [])

        console.log("git commit has been executed")

        if (options.push) {
          const remote = options.remote || process.env.DEFAULT_REMOTE || "origin"
          const branch = options.branch || process.env.DEFAULT_BRANCH || (await getCurrentBranch())
          console.log(`Pushing to ${remote}/${branch} ...`)
          await push(remote, branch)
          console.log("Push done.")
        }

        process.exit(0)
      } catch (err) {
        console.error("Error: ", (err as Error).message)
        process.exit(1)
      }
    })

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
