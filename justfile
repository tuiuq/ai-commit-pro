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
	@git commit -m "$(printf '%s' '{{msg}}')"

update-changelog:
	git cliff --bump -o;
	git add CHANGELOG.md
	just commit "chore: update changelog"

publish msg="":
	#!/usr/bin/env bash
	set -euo pipefail

	# 1. 保证在干净的主分支
	if [[ -n "$(git status -s)" ]]; then
	  echo "工作区有改动，请先提交或stash"
	  exit 1
	fi

	BRANCH=$(git rev-parse --abbrev-ref HEAD)

	if [[ "$BRANCH" != "main" && "$BRANCH" != "master" ]]; then
	  echo "只能在 main/master 分支发布, 当前: $BRANCH"
	  exit 1
	fi

	# 2. 拉最新代码并构建
	git pull --rebase
	just build

	# 3. 版本号 bump
	next_version=$(git cliff --bumped-version | tail -n 1)
	pnpm version "${next_version}"
	just update-changelog

	# 4. 发布
	pnpm publish
	echo "已发布 ${next_version}"

	# 5. 打 tag 推送
	git tag -a "v${next_version}" -m "{{msg}}"
	git push --follow-tags
