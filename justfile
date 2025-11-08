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
	raw_version=$(git cliff --bumped-version | tail -n 1)
	next_version=$(echo "${raw_version}" | sed 's/^v*//')

	pnpm version "${next_version}" --no-git-tag-version

	just update-changelog

	git add package.json CHANGELOG.md
	just commit "chore(release): Bump version v${next_version}"

	# 4. 发布
	pnpm publish
	echo "已发布 ${next_version}"

	# 5. 打 tag 推送
	VERSION="v${next_version}"
	USER_MSG="{{msg}}"
	FINAL_TAG_MSG=""

	if [[ -n "${USER_MSG}" ]]; then
		FINAL_TAG_MSG="Release ${VERSION}: ${USER_MSG}"
	else
		FINAL_TAG_MSG="Release version ${VERSION}"
	fi

	git tag -a "${VERSION}" -m "${FINAL_TAG_MSG}"
	git push --follow-tags
