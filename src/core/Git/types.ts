import z from "zod";

/**
 * config for git operator
 */
export interface GitOperatorConfig {
  cwd?: string;
  timeout?: number;
}

export interface ExecuteGitCommandResult {
  success: boolean;
  output: string;
  error?: string;
  cause?: Error;
}

export const GitFileInfoSchema = z.object({
  path: z.string().min(1, "Path is required").describe("Path of the file"),
  status: z.enum(["A", "M", "D", "R", "C", "U", "?", "!"]).describe("Status of the file"),
  originalPath: z.string().optional().describe("Original path of the file if it was renamed"),
})

export const GitFileInfoSummarySchema = GitFileInfoSchema.extend({
  summary: z.string().describe("Summary of the file changes"),
})

export const GitCommitSchema = z.object({
  hash: z.string().min(1, "Hash is required").describe("Hash of the commit"),
  author: z.string().min(1, "Author is required").describe("Author of the commit"),
  date: z.string().min(1, "Date is required").describe("Date of the commit"),
  message: z.string().min(1, "Message is required").describe("Message of the commit"),
})

export const GitBranchInfoSchema = z.object({
  name: z.string().min(1, "Name is required").describe("Name of the branch"),
  isCurrent: z.boolean().describe("Whether the branch is the current branch"),
  lastCommit: z.string().min(1, "Last commit is required").describe("Last commit of the branch")
})

export const GitStatisticsSchema = z.object({
  added: z.number().describe("Number of lines added"),
  deleted: z.number().describe("Number of lines deleted"),
  modified: z.number().describe("Number of lines modified"),
  deletedCount: z.number().describe("Number of files deleted"),
})

export const GitChangedSummarySchema = z.object({
  files: z.array(GitFileInfoSummarySchema).describe("Summary of the file changes"),
  statistics: GitStatisticsSchema.describe("Statistics of the file changes"),
})

export type GitFileInfo = z.infer<typeof GitFileInfoSchema>
export type GitCommit = z.infer<typeof GitCommitSchema>
export type GitBranchInfo = z.infer<typeof GitBranchInfoSchema>
export type GitFileInfoSummary = z.infer<typeof GitFileInfoSummarySchema>
export type GitChangedSummary = z.infer<typeof GitChangedSummarySchema>
export type GitStatistics = z.infer<typeof GitStatisticsSchema>
