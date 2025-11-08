ROOT := `git rev-parse --show-toplevel`
BIN := join(ROOT, "node_modules/.bin")

default: build

clean:
  rm -rf dist

type:
  {{BIN}}/tsc -p tsconfig.build.json

bundle:
  bun run esbuild.config.ts

build:
  just clean
  just type
  just bundle

dev:
  watchexec -e ts --clear --restart -- just build

commit msg:
	git commit -m "$(printf '%s' '{{msg}}')"