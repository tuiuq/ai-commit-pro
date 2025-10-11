import { Command } from "commander"
import { version } from "../package.json"

async function main() {
	const program = new Command()

	program
		.name("ai-commit")
		.description("AI-powered git commit message generator using Moonshot API")
		.version(version, "--V, --version")


	if (process.argv.slice(2).length === 0) {
		program.outputHelp()
	}

	await program.parseAsync(process.argv)
}

main().catch(error => {
	console.error("An error occurred: ", error)
	process.exit(1)
})
