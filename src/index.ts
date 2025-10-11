import { Command } from "commander"
import { version } from "../package.json"

async function main() {
	const program = new Command()

	program
		.name("ai-commit")
		.description("AI-powered git commit message generator using Moonshot API")
		.version(version, "--V, --version")

	await program.parseAsync(process.argv)
}

main().catch(error => {
	console.error("An error occurred: ", error)
	process.exit(1)
})
