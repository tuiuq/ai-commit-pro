import z from "zod";

export const GenerateOptionsSchema = z.object({
  lang: z.enum(["zh", "en"]).default("zh").describe("指定生成的Commit Message语言"),
  verbose: z.boolean().default(false).describe("显示详细信息"),
})

export type GenerateOptions = z.infer<typeof GenerateOptionsSchema>