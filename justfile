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

	# 1. 检查工作区是否干净
	if [[ -n "$(git status -s)" ]]; then
	  echo "工作区有改动，请先提交或stash"
	  exit 1
	fi

	BRANCH=$(git rev-parse --abbrev-ref HEAD)
	if [[ "$BRANCH" != "main" && "$BRANCH" != "master" ]]; then
	  echo "只能在 main/master 分支发布, 当前: $BRANCH"
	  exit 1
	fi

	# 2. 拉取最新代码
	git pull --rebase --tags

	# 3. 自动版本号 bump
	raw_version=$(git cliff --bumped-version | tail -n 1)
	next_version=$(echo "${raw_version}" | sed 's/^v*//')

	if [[ -z "$next_version" ]]; then
	  echo "版本号生成失败"
	  exit 1
	fi

	pnpm version "${next_version}" --no-git-tag-version

	# 4. 构建打包
	just build

	# 5. 更新 changelog 并提交
	just update-changelog
	git add package.json CHANGELOG.md
	just commit "chore(release): Bump version v${next_version}"

	# 6. 发布 npm 包
	pnpm publish --access public
	echo "已发布 ${next_version}"

	# 7. 创建轻量tag
	VERSION="v${next_version}"
	git tag "${VERSION}"

	# 8. 生成 release notes
	RELEASE_NOTES="$(git cliff -l)"
	USER_MSG="{{msg}}"

	if [[ -n "$USER_MSG" ]]; then
	  RELEASE_NOTES="${RELEASE_NOTES}"$'\n\n'"$USER_MSG"
	fi

	# 8. 写入临时文件
	echo "${RELEASE_NOTES}" > .release_notes.tmp

	# 9. 并推送
	git push origin main --tags

	# 10. 创建 GitHub Release
	gh release create "${VERSION}" --title "Release ${VERSION}" --notes-file .release_notes.tmp
	rm .release_notes.tmp

	echo "✅ GitHub Release created: ${VERSION}"
