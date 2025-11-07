import { build, type Plugin } from "esbuild"
import { resolve } from "node:path"
import { builtinModules } from "node:module"
import { copy } from "esbuild-plugin-copy"

const isDev = process.argv.includes("--dev")

const aliasPlugin = {
  name: "alias",
  setup(build) {
    build.onResolve({ filter: /^@\// }, args => {
      const newPath = resolve("src", args.path.replace(/^@\//, ""))
      return {
        path: newPath
      }
    })
  }
} as Plugin
  
const external = [...builtinModules, ...builtinModules.map(moduleName => `node:${moduleName}`)]
  
await build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  outExtension: {
    ".js": ".cjs"
  },
  bundle: true,
  loader: {
    ".md": "text"
  },
  external,
  platform: "node",
  format: "cjs",
  banner: {
    js: "#!/usr/bin/env node"
  },
  publicPath: !isDev ? "/public" : "./public",
  plugins: [
    aliasPlugin,
    copy({
      assets: {
        from: ["public/**/*"],
        to: ["./"]
      }
    })
  ],
  sourcemap: isDev,
  minify: !isDev,
  target: "node20"
})

console.log("Build completed")
