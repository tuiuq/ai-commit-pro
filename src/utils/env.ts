import type { ZodType } from "zod"

export function parseEnv<T>(schema: ZodType<T>, raw: Record<string, string | undefined> = process.env) {
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    throw parsed.error
  }
  
  return parsed.data
}