import { build, type Plugin } from "esbuild"
import { resolve } from "node:path"

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
  
await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  banner: {
    js: "#!/usr/bin/env node"
  },
  plugins: [aliasPlugin],
  sourcemap: true,
  minify: true,
  target: "node20"
})

console.log("Build completed")
