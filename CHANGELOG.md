## [1.2.1] - 2025-11-08

### 🚜 Refactor

- *(justfile)* ♻️ 修改版本号提取逻辑
## [1.2.0] - 2025-11-08

### 🚀 Features

- *(generate)* 🎉 增加生成提交信息功能
- *(generate)* 🎉 Add language option to generate commit message

### 🚜 Refactor

- *(generate)* ♻️ 更新模块导入路径为 TypeScript 格式

### 📚 Documentation

- *(系统提示)* 📚 更新系统提示文件

### ⚙️ Miscellaneous Tasks

- Update changelog
- *(justfile)* 🔧 Update commit message script
- *(justfile)* ♻️ 优化发布流程
- *(release)* Bump version vvv1.2.0
## [1.1.1] - 2025-11-08

### 🚜 Refactor

- *(generate)* ♻️ 更新 commit 调用为 sendCommit

### 📚 Documentation

- *(system)* 📚 Update system documentation format
## [1.1.0] - 2025-11-08

### ⚙️ Miscellaneous Tasks

- Update changelog
## [1.1.0] - 2025-11-08

### 🚀 Features

- *(utils)* 🎉 Add getTopLevel function to determine the top-level directory of the git repository

### 🚜 Refactor

- *(justfile)* ♻️ 更新构建工具链至使用 node_modules/.bin

### ⚙️ Miscellaneous Tasks

- *(justfile)* 🔧 添加 git commit 消息模板命令
- *(cliff.toml)* 🔧 初始化 cliff.toml 配置文件
- *(justfile)* 🔧 添加发布流程自动化脚本
## [1.0.0] - 2025-11-07

### 🚀 Features

- Add initial CLI setup for ai-commit tool
- Add bin commands for easier CLI usage
- *(generate)* Add generate command for AI commit messages
- *(git)* Add utility functions for git diff operations
- *(utils)* Add env parsing utility with zod validation
- *(generate)* Add env validation for OpenAI config
- *(build)* Add dev mode support and public assets handling
- *(utils)* Add PromptTemplate class for dynamic prompt generation
- *(utils)* Add prompt loading and building utilities
- *(utils)* 🎉 Add isChanged function to check for changes
- *(generate)* Implement AI commit message generation
- *(generate)* Add option to directly commit generated message
- *(git)* Add commit function to handle multi-line messages
- *(generate)* Add error handling and commit option for generated messages
- *(generate)* Add option to specify custom prompt file path
- *(generate)* Add support for custom prompt files

### 🚜 Refactor

- *(Template)* Simplify generic type and improve string conversion
- Remove unused imports from generate command

### 📚 Documentation

- *(prompts)* Add user and system prompt templates for commit message generation
- Update system prompt formatting and instructions
- Update system prompt format documentation

### ⚙️ Miscellaneous Tasks

- Add .gitignore file to exclude development environment files
- Add dist directory to gitignore

### Build

- Add initial package.json configuration
- Add .npmrc with peerDeps and version config
- Add dev dependencies for TypeScript and esbuild
- Add tsconfig.json with strict TypeScript settings
- Add tsconfig.build.json for type declarations
- Update module system to nodenext for better Node.js compatibility
- Update tsconfig include pattern to match all files recursively
- Add esbuild configuration for node project
- Add justfile for build automation
- Add commander as a dependency
- Add chalk and its type definitions as dependencies
- Switch to CommonJS format and add node builtins as externals
- Change output format from single file to directory
- Add zod dependency for schema validation
- Add openai dependency for API integration
- Add esbuild-plugin-copy dependency for asset copying
- Add package config and registry settings
