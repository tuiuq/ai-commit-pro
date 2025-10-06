import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: "cjs",
  clean: true,
  dts: true,
  target: "es2022",
  platform: "node",
  banner: {
    js: "#!/usr/bin/env node"
  }
})