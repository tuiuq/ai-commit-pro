# Changelog
## [1.4.0](https://github.com/tuiuq/ai-commit-pro/compare/v1.3.0..v1.4.0) - 2025-11-11

### ⛰️  Features

- *(commands/generate)* 🎉 Update language option default value to "en" - ([0fbbb9d](https://github.com/tuiuq/ai-commit-pro/commit/0fbbb9d1685bf22de07bfa08be86adedbc721daf))
- *(utils)* 🎉 添加 Logger 类以支持不同级别的日志记录功能 - ([ae9682e](https://github.com/tuiuq/ai-commit-pro/commit/ae9682e747424f3890d4167cd46965791bb868fb))
- *(utils)* 🎉 Add formatDate function to format date strings - ([9a1fc3f](https://github.com/tuiuq/ai-commit-pro/commit/9a1fc3fc2a9d1f0cdaa09b533cabcb2237731f5d))
- *(utils)* 🎉 add addPrefixZero function - ([e3d7882](https://github.com/tuiuq/ai-commit-pro/commit/e3d7882582f4f70f12390f7a9f9e135de9826506))

### 🚜 Refactor

- *(generate)* ♻️ 优化生成 Git 提交信息的代码逻辑 - ([fbb6245](https://github.com/tuiuq/ai-commit-pro/commit/fbb62453d8d3dc103058426089bc6b005f739c23))
- *(generate)* ♻️ 更新导入路径为 TypeScript 标准 - ([ff372c3](https://github.com/tuiuq/ai-commit-pro/commit/ff372c3618c8c7b036d69c4803a7f55b091cd657))
- *(generate)* ♻️ 优化生成器功能及日志记录 - ([f6a8d36](https://github.com/tuiuq/ai-commit-pro/commit/f6a8d36849cfe5a77b9f22f3533a50e2794e9214))
- *(generate)* ♻️ Update zod import to include ZodType - ([cf3209e](https://github.com/tuiuq/ai-commit-pro/commit/cf3209e9ff3434eac02d50f34fdc381de382aff0))
- *(generate)* ♻️ 使用zod校验generate命令的选项 - ([2bf7819](https://github.com/tuiuq/ai-commit-pro/commit/2bf7819e808a3ed8bccb7212099e1b9cd697bd16))

## [1.3.0](https://github.com/tuiuq/ai-commit-pro/compare/v1.2.6..v1.3.0) - 2025-11-11

### ⛰️  Features

- *(generate)* 🎉 添加提交结果返回功能 - ([98d223c](https://github.com/tuiuq/ai-commit-pro/commit/98d223ceda260fff51815ec4159c0cee483905bb))

### 🚜 Refactor

- *(generate)* ♻️ Remove unnecessary newline at end of file - ([c5df555](https://github.com/tuiuq/ai-commit-pro/commit/c5df555d6f0778234fd1c352f90d1b8ae6684b35))
- *(generate/openai)* ♻️ 优化 OpenAI 生成 commit 消息的错误处理 - ([b15cffc](https://github.com/tuiuq/ai-commit-pro/commit/b15cffcabc31bad9ceb2452fd754698bb3c011b2))
- *(generate/prompt)* ♻️ 优化自定义提示加载逻辑 - ([8f41e59](https://github.com/tuiuq/ai-commit-pro/commit/8f41e5917e6257c0fc3cde7f65c3e98fb66ba70b))
- *(openai)* ♻️ 格式化文件结尾 - ([6e8c9cf](https://github.com/tuiuq/ai-commit-pro/commit/6e8c9cfb399847d074cddc947aff018416a85cce))

## [1.2.6](https://github.com/tuiuq/ai-commit-pro/compare/v1.2.5..v1.2.6) - 2025-11-10

### 🚜 Refactor

- *(justfile)* ♻️ 更新 GitHub Release 创建命令格式 - ([5669fc3](https://github.com/tuiuq/ai-commit-pro/commit/5669fc353f86cae156cedc3036d8ed104b64dd87))

## [1.2.5](https://github.com/tuiuq/ai-commit-pro/compare/v1.2.4..v1.2.5) - 2025-11-10

### 🚜 Refactor

- *(cliff.toml)* ♻️ 更新 Cliff.toml 配置文件以支持更丰富的 commit 信息和发布流程 - ([659dc2a](https://github.com/tuiuq/ai-commit-pro/commit/659dc2a366fb556ce8e9de92309e6763bbb85664))
- *(justfile)* ♻️ 优化发布流程，添加自动生成 release notes 和 GitHub Release 创建 - ([9662a27](https://github.com/tuiuq/ai-commit-pro/commit/9662a27e589f90b772f17b41b3dcf245b6273e42))

### 📚 Documentation

- *(CHANGELOG)* 📚 更新项目变更日志 - ([90281ef](https://github.com/tuiuq/ai-commit-pro/commit/90281efc640a6a7068034f95a10e64e149636aeb))

### ⚙️ Miscellaneous Tasks

- *(cliff.toml)* 🔧 Add GitHub token configuration for remote - ([f107214](https://github.com/tuiuq/ai-commit-pro/commit/f107214b78081a82614b4f315bc500b82e739697))

## [1.2.4](https://github.com/tuiuq/ai-commit-pro/compare/v1.2.3..v1.2.4) - 2025-11-10

### 🚜 Refactor

- *(justfile)* ♻️ 优化发布流程 - ([f11aa1d](https://github.com/tuiuq/ai-commit-pro/commit/f11aa1dc718f6b2cc20c12616e0063cbcfe8764b))

## [1.2.3](https://github.com/tuiuq/ai-commit-pro/compare/v1.2.2..v1.2.3) - 2025-11-10

### 🚜 Refactor

- *(generate)* ♻️ 简化 commit 操作流程 - ([17ba96e](https://github.com/tuiuq/ai-commit-pro/commit/17ba96ee5e80db28caebd17f520c5dfa46b60392))
- *(generate)* ♻️ 修改 handleOutput 函数以记录 commit 操作结果 - ([999e18b](https://github.com/tuiuq/ai-commit-pro/commit/999e18bfc21ac9f01db64f0f2fa6183f0ca24cee))
- *(utils)* ♻️ 优化 commit 函数中消息处理逻辑 - ([a06232e](https://github.com/tuiuq/ai-commit-pro/commit/a06232e7451a24787ef0de1520db25c31db2815c))
- *(utils/simpleGit)* ♻️ 替换 execSync 为 spawnSync 以处理 git commit - ([02b89b8](https://github.com/tuiuq/ai-commit-pro/commit/02b89b8b580836ff8cc50a2f0b7ccd768d32458d))

## [1.2.2](https://github.com/tuiuq/ai-commit-pro/compare/v1.2.1..v1.2.2) - 2025-11-08

### 🚜 Refactor

- *(justfile)* ♻️ 优化发布打 tag 逻辑 - ([b9d2b28](https://github.com/tuiuq/ai-commit-pro/commit/b9d2b28b0b4f729dbdff8c96c77619b1fd0ecfb3))

## [1.2.1](https://github.com/tuiuq/ai-commit-pro/compare/v1.1.1..v1.2.1) - 2025-11-08

### ⛰️  Features

- *(generate)* 🎉 Add language option to generate commit message - ([6a28768](https://github.com/tuiuq/ai-commit-pro/commit/6a287688a66150e6b828732349fb36d1448a3c96))
- *(generate)* 🎉 增加生成提交信息功能 - ([a564387](https://github.com/tuiuq/ai-commit-pro/commit/a564387461d59f886e4b344431bf9aa2d594bcae))

### 🚜 Refactor

- *(generate)* ♻️ 更新模块导入路径为 TypeScript 格式 - ([38a2f96](https://github.com/tuiuq/ai-commit-pro/commit/38a2f9672cd03190d65d15d19f0244bfdc93c27d))
- *(justfile)* ♻️ 修改版本号提取逻辑 - ([49dc18c](https://github.com/tuiuq/ai-commit-pro/commit/49dc18c94bfa5a26abba581e82973fb29740fc60))

### 📚 Documentation

- *(系统提示)* 📚 更新系统提示文件 - ([66295a0](https://github.com/tuiuq/ai-commit-pro/commit/66295a08f64d89869a17b14a7b9f30baa5cf96f1))

### ⚙️ Miscellaneous Tasks

- *(justfile)* ♻️ 优化发布流程 - ([cd1874d](https://github.com/tuiuq/ai-commit-pro/commit/cd1874daa9e5b8348203b6dbf3cdbd8e58627884))
- *(justfile)* 🔧 Update commit message script - ([938ff68](https://github.com/tuiuq/ai-commit-pro/commit/938ff683995f15e6402dc6181cc3f4fa32ce3273))
- Update changelog - ([d47d530](https://github.com/tuiuq/ai-commit-pro/commit/d47d530e4efb322571061daa18c8193cb344cfa9))

## [1.1.1](https://github.com/tuiuq/ai-commit-pro/compare/v1.1.0..v1.1.1) - 2025-11-08

### 🚜 Refactor

- *(generate)* ♻️ 更新 commit 调用为 sendCommit - ([e00ca02](https://github.com/tuiuq/ai-commit-pro/commit/e00ca028c2a99f37326c21c6cfda03b1a35dc4cc))

### 📚 Documentation

- *(system)* 📚 Update system documentation format - ([5dc0208](https://github.com/tuiuq/ai-commit-pro/commit/5dc0208b87f974b8d0d86387d598c8050d28cec5))

### ⚙️ Miscellaneous Tasks

- Update changelog - ([830e0b8](https://github.com/tuiuq/ai-commit-pro/commit/830e0b896fd7e3e82d44da3089876cc4f85ff57e))

## [1.1.0](https://github.com/tuiuq/ai-commit-pro/compare/v1.0.0..v1.1.0) - 2025-11-08

### ⛰️  Features

- *(utils)* 🎉 Add getTopLevel function to determine the top-level directory of the git repository - ([5551af1](https://github.com/tuiuq/ai-commit-pro/commit/5551af14aa09251dee089ee3a3471f30abbde145))

### 🚜 Refactor

- *(justfile)* ♻️ 更新构建工具链至使用 node_modules/.bin - ([37be886](https://github.com/tuiuq/ai-commit-pro/commit/37be886e4f3eb43566e97c9eb2d46f3cb8262cf2))

### ⚙️ Miscellaneous Tasks

- *(cliff.toml)* 🔧 初始化 cliff.toml 配置文件 - ([6fcc297](https://github.com/tuiuq/ai-commit-pro/commit/6fcc2979fb997f932288ac119c53e2b4045d41bc))
- *(justfile)* 🔧 添加发布流程自动化脚本 - ([28bfe62](https://github.com/tuiuq/ai-commit-pro/commit/28bfe62f371653619bdf10146b7e6e6afc59376f))
- *(justfile)* 🔧 添加 git commit 消息模板命令 - ([b8d3bfd](https://github.com/tuiuq/ai-commit-pro/commit/b8d3bfd5c04a575fbf86ea81dd8faef70cd39892))

## [1.0.0] - 2025-11-07

### ⛰️  Features

- *(build)* Add dev mode support and public assets handling - ([102ecd9](https://github.com/tuiuq/ai-commit-pro/commit/102ecd91080a7a9313d6e1996169a6f32f6295b1))
- *(generate)* Add support for custom prompt files - ([c774bc1](https://github.com/tuiuq/ai-commit-pro/commit/c774bc1e6e1adffd662528453ddbb7e5f72f3614))
- *(generate)* Add option to specify custom prompt file path - ([eb67836](https://github.com/tuiuq/ai-commit-pro/commit/eb678367b3891e860abdb91aec94771d11ae6e94))
- *(generate)* Add error handling and commit option for generated messages - ([e34178f](https://github.com/tuiuq/ai-commit-pro/commit/e34178f9fc714683962ddea58a0b23bd374abe12))
- *(generate)* Add option to directly commit generated message - ([ab4b88f](https://github.com/tuiuq/ai-commit-pro/commit/ab4b88f4f71b8dd6c2afbae497ad366fe1d996cc))
- *(generate)* Implement AI commit message generation - ([7ade736](https://github.com/tuiuq/ai-commit-pro/commit/7ade736e812963cd8ab5a793c6d3080416b462a3))
- *(generate)* Add env validation for OpenAI config - ([478295b](https://github.com/tuiuq/ai-commit-pro/commit/478295bc58bb97856ab7fce5d6e69380cce526fb))
- *(generate)* Add generate command for AI commit messages - ([aca2740](https://github.com/tuiuq/ai-commit-pro/commit/aca274029bfb8f7b575f981a454bb9229b123fed))
- *(git)* Add commit function to handle multi-line messages - ([efd3a9e](https://github.com/tuiuq/ai-commit-pro/commit/efd3a9e4aa6d67b691702f74134c5998ace6141b))
- *(git)* Add utility functions for git diff operations - ([4269810](https://github.com/tuiuq/ai-commit-pro/commit/426981085d4b035f00a0c95f1bbf7f6802638ee5))
- *(utils)* 🎉 Add isChanged function to check for changes - ([706961f](https://github.com/tuiuq/ai-commit-pro/commit/706961f2ae670679e92e00cf7c1bdeeeda315ac4))
- *(utils)* Add prompt loading and building utilities - ([ffdd07c](https://github.com/tuiuq/ai-commit-pro/commit/ffdd07c4d101132a6db274c25daa866698d30a19))
- *(utils)* Add PromptTemplate class for dynamic prompt generation - ([b88776e](https://github.com/tuiuq/ai-commit-pro/commit/b88776eae1ddd9c63c086927a28ae60cade4c354))
- *(utils)* Add env parsing utility with zod validation - ([1a75890](https://github.com/tuiuq/ai-commit-pro/commit/1a7589029f9be3d3b6fa47b263aef131d17283ff))
- Add bin commands for easier CLI usage - ([184fa08](https://github.com/tuiuq/ai-commit-pro/commit/184fa083b775a84c70cbd2ccddcc66dff296257b))
- Add initial CLI setup for ai-commit tool - ([6791a2d](https://github.com/tuiuq/ai-commit-pro/commit/6791a2d843bbf3d0edd4539517d87e977f8b2ae1))

### 🚜 Refactor

- *(Template)* Simplify generic type and improve string conversion - ([be92c9f](https://github.com/tuiuq/ai-commit-pro/commit/be92c9f2b531b94610ea96b8f7d69adeaf68b3ec))
- Remove unused imports from generate command - ([149c84f](https://github.com/tuiuq/ai-commit-pro/commit/149c84feed775f2b2c70239c12ba216ce371b2eb))

### 📚 Documentation

- *(prompts)* Add user and system prompt templates for commit message generation - ([76059a4](https://github.com/tuiuq/ai-commit-pro/commit/76059a4722c6dfac2cc639a7ac167f32555e267a))
- Update system prompt format documentation - ([7fdd4f0](https://github.com/tuiuq/ai-commit-pro/commit/7fdd4f0bd02d1d822e27cb01fa16f90614b4515a))
- Update system prompt formatting and instructions - ([3c3eb4b](https://github.com/tuiuq/ai-commit-pro/commit/3c3eb4bd8407637b9b0a048d7a382a3fdfd9d70e))

### ⚙️ Miscellaneous Tasks

- Add dist directory to gitignore - ([1a15c32](https://github.com/tuiuq/ai-commit-pro/commit/1a15c32eb5d126b46a1dbeb14e2b122b345f5c2d))
- Add .gitignore file to exclude development environment files - ([7de2702](https://github.com/tuiuq/ai-commit-pro/commit/7de2702009267787bb68a7fc8be18450914210b0))

### Build

- Add package config and registry settings - ([ffe76fb](https://github.com/tuiuq/ai-commit-pro/commit/ffe76fb9289ac19ce94eb7805ab1d7adefe2d2bc))
- Add esbuild-plugin-copy dependency for asset copying - ([658ec7b](https://github.com/tuiuq/ai-commit-pro/commit/658ec7be080382a7345d1dae1993d66df2b27545))
- Add openai dependency for API integration - ([88f58f9](https://github.com/tuiuq/ai-commit-pro/commit/88f58f9c56ef420112ded562ac6b827d4a3b6192))
- Add zod dependency for schema validation - ([4cd7855](https://github.com/tuiuq/ai-commit-pro/commit/4cd785511807820bd9075705b4a2166169488506))
- Change output format from single file to directory - ([f6ef101](https://github.com/tuiuq/ai-commit-pro/commit/f6ef10160164a7f42281f3852c6a89768e1c3918))
- Switch to CommonJS format and add node builtins as externals - ([3b673ab](https://github.com/tuiuq/ai-commit-pro/commit/3b673ab3b4597b8e7be6efb2204fee3af978ce66))
- Add chalk and its type definitions as dependencies - ([81834de](https://github.com/tuiuq/ai-commit-pro/commit/81834de94c5363d9cc040937a151add5534f2627))
- Add commander as a dependency - ([24d9b1a](https://github.com/tuiuq/ai-commit-pro/commit/24d9b1a36b2c4908fc4ac4b7150932eeb46c2b5c))
- Add justfile for build automation - ([539bfcf](https://github.com/tuiuq/ai-commit-pro/commit/539bfcf443f95dc16574ed9f52b19a58f27357ff))
- Add esbuild configuration for node project - ([950e61a](https://github.com/tuiuq/ai-commit-pro/commit/950e61a658a7441f33af82903acd9a1d2f1900bb))
- Update tsconfig include pattern to match all files recursively - ([c85ffb1](https://github.com/tuiuq/ai-commit-pro/commit/c85ffb1ee8f8cdc1600e47336759eb46af4f57cf))
- Update module system to nodenext for better Node.js compatibility - ([aed66b6](https://github.com/tuiuq/ai-commit-pro/commit/aed66b66eb4dab9e14cf889047811ea65a555a20))
- Add tsconfig.build.json for type declarations - ([35d5c1a](https://github.com/tuiuq/ai-commit-pro/commit/35d5c1a039ccaa0bbe6861ee06328ca3457a833f))
- Add tsconfig.json with strict TypeScript settings - ([e2016f4](https://github.com/tuiuq/ai-commit-pro/commit/e2016f45aabcb7b4a0ab7de3ad2b51c61f3162ec))
- Add dev dependencies for TypeScript and esbuild - ([7539048](https://github.com/tuiuq/ai-commit-pro/commit/7539048037cff6d353391a8ffc0bf39f621518f1))
- Add .npmrc with peerDeps and version config - ([c68f345](https://github.com/tuiuq/ai-commit-pro/commit/c68f3456aace5361515441c1901257139998f7eb))
- Add initial package.json configuration - ([6058314](https://github.com/tuiuq/ai-commit-pro/commit/6058314762bd44d7a8c7e2005a5f4b6f29156535))

## New Contributors ❤️

* @tuiuq made their first contribution
<!-- generated by git-cliff -->
