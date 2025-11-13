import {
  spawnSync,
  type SpawnSyncOptions
} from "node:child_process";
import { 
  GitFileInfoSchema,
  GitOperatorConfig,
  GitFileInfo,
  ExecuteGitCommandResult
} from "./types.ts";
import { existsSync } from "node:fs";
import { join } from "node:path";


export class GitOperator {
  private cwd!: string;
  private timeout!: number;

  constructor(config: GitOperatorConfig = {}) {
    this.cwd = config.cwd || process.cwd();
    this.timeout = config.timeout || 30 * 1000;
  }
  
  /**
   * Executes a git command and returns the stdout.
   *
   * @param {string[]} args Git command arguments
   * @param {SpawnSyncOptions} options SpawnSyncOptions
   * @returns {string} The stdout of the git command
   */
  private executeGitCommand(
    args: string[],
    options: SpawnSyncOptions = {}
  ): string {
    const defaultOptions: SpawnSyncOptions = {
      cwd: this.cwd,
      encoding: "utf-8",
      timeout: this.timeout,
      ...options
    }

    try {
      const result = spawnSync("git", args, defaultOptions);
      
      if (result.error) {
        throw new Error(`Git Command Failed: ${args.join(" ")}: ${result.error.message}`, {
          cause: result.error
        })
      }
      
      if (result.status !== 0) {
        const errorMessage = result.stderr?.toString().trim() || "Unknown error.";
        
        if (
          errorMessage.includes("No such file or directory") ||
          errorMessage.includes("does not exist")
        ) {
          throw new Error(`File not found: ${args.at(-1)}: ${result.stderr}`, {
            cause: result.error
          })
        }

        throw new Error(`Git Command Failed with status ${result.status}: ${args.join(" ")}: ${result.stderr}`)
      }
      
      return result.stdout?.toString().trim() || ""
    } catch (error) {
      throw new Error(`Git Command Execution Failed: ${args.join(" ")}: ${(error as Error).message}`, {
        cause: error
      })
    }
  }
  
  /**
   * Executes a git command and returns the result.
   *
   * @param {string[]} args Git command arguments
   * @param {SpawnSyncOptions} options SpawnSyncOptions
   * @returns {ExecuteGitCommandResult} The result of the git command
   */
  private executeGitCommandSafe(
    args: string[],
    options: SpawnSyncOptions = {}
  ): ExecuteGitCommandResult {
    const defaultOptions: SpawnSyncOptions = {
      cwd: this.cwd,
      encoding: "utf-8",
      timeout: this.timeout,
      ...options
    }
    
    try {
      const result = spawnSync("git", args, defaultOptions);
      
      if (result.error) {
        return {
          success: false,
          output: "",
          error: result.error.message,
          cause: result.error
        }
      }
      
      if (result.status !== 0) {
        return {
          success: false,
          output: "",
          error: result.stderr?.toString().trim() || `Unknown error, Exit code ${result.status}.`,
          cause: result.error
        }
      }
      
      return {
        success: true,
        output: result.stdout?.toString().trim() || ""
      }
    } catch (error) {
      return {
        success: false,
        output: "",
        error: (error as Error).message,
        cause: error as Error
      }
    }
  }
  
  private checkExists(
    filePath: string
  ): boolean {
    try {
      return existsSync(join(this.cwd, filePath))
    } catch (error) {
      return false;
    }
  }

  /**
   * Returns the root directory of the git repositories.
   *
   * @returns {string} The root directory of the git repositories
   */
  public getRepositoriesRoot(): string {
    try {
      return this.executeGitCommand(["rev-parse", "--show-toplevel"])
    } catch (error) {
      throw new Error("Not a git repositories")
    }
  }
  
  /**
   * Checks if the current directory is a git repository.
   *
   * @returns {boolean} True if the current directory is a git repository, false otherwise
   */
  public isGitRepository(): boolean {
    try {
      this.getRepositoriesRoot()
      return true
    } catch (error) {
      return false
    }
  }
  
  /**
   * Returns the staged files in the git repository.
   *
   * @returns {Array<GitFileInfo>} The staged files in the git repository
   */
  public getStagedFiles(): Array<GitFileInfo> {
    const output = this.executeGitCommand(["diff", "--cached", "--name-status"])
    
    if (!output) {
      return [];
    }
    
    return output.split("\n")
      .filter(line => line.trim())
      .map(line => {
        const [status, ...pathParts] = line.split("\t")
        const path = pathParts.join("\t")
        
        
        return GitFileInfoSchema.parse({
          status,
          path
        })
      })
  }
  
  /**
   * Returns the changed files in the git repository.
   *
   * @returns {Array<GitFileInfo>} The changed files in the git repository
   */
  public getChangedFiles(): Array<GitFileInfo> {
    const output = this.executeGitCommand(["status", "--porcelain"])
    
    if (!output) {
      return [];
    }
    
    return output.split("\n")
      .filter(line => line.trim())
      .map(line => {
        const status = line.substring(0, 2).trim()
        const path = line.substring(2).trim()
        
        return GitFileInfoSchema.parse({
          status,
          path
        })
      })
  }
  
  /**
   * Returns the diff for a deleted file in the git repository.
   *
   * @param {string} filePath The path of the deleted file
   * @param {boolean} staged Whether to get the diff for the staged version of the file
   * @returns {string} The diff for the deleted file
   */
  private getDeletedFileDiff(
    filePath: string,
    staged: boolean = true
  ): string {
    try {
      const args = ["show"];
      
      if (staged) {
        args.push(`HEAD:${filePath}`)
      } else {
        args.push(`:${filePath}`)
      }
      
      const result = this.executeGitCommandSafe(args)
      
      if (result.success) {
        return `--- a/${filePath}\n+++ /dev/null\n@@ -1 +0,0 @@\n${result.output.split("\n").map(line => `-${line}`).join("\n")}`
      } else {
        return `File ${filePath} was deleted\n${result.error || "Unable to retrieve deleted file content"}`
      }
    } catch (error) {
      return `File ${filePath} was deleted, but an error occurred: ${(error as Error).message}`
    }
  }
  
  /**
   * Returns the status of a file in the git repository.
   * 
   * @param {string} filePath The path of the file
   * @returns {string} The status of the file
   */
  private getFileStatus(
    filePath: string
  ): GitFileInfo["status"] | "" {
    const allFiles = this.getChangedFiles()
    const fileInfo = allFiles.find(file => file.path === filePath)
    return fileInfo?.status || ""
  }
  
  /**
   * Returns the diff for a file in the git repository.
   * 
   * @param {string} filePath The path of the file
   * @param {boolean} staged Whether to get the diff for the staged version of the file
   * @returns {string} The diff for the file
   */
  public getFileDiff(
    filePath: string,
    staged: boolean = true
  ): string {
    const fileStatus = this.getFileStatus(filePath)
    
    if (fileStatus === "D") {
      return this.getDeletedFileDiff(filePath, staged)
    }
    
    const args = ["diff"];
    
    if (staged) {
      args.push("--cached")
    }
    
    args.push(filePath)
    
    const result = this.executeGitCommandSafe(args)
    
    if (!result.success) {
      if (result.error?.includes("No such file") || result.error?.includes("does not exist")) {
        return this.getDeletedFileDiff(filePath, staged)
      }
      throw new Error(`Failed to get diff for file ${filePath}: ${result.error}`)
    }
    
    return result.output
  }
  
  /**
   * Returns the diff for all staged files in the git repository.
   * 
   * @returns {Array<{
   *   file: string;
   *   diff: string;
   *   status: GitFileInfo["status"];
   *   hasError: boolean;
   * }>} The diff for all staged files in the git repository
   */
  public getAllStagedDiffs(): Array<{
    file: string;
    diff: string;
    status: GitFileInfo["status"];
    hasError: boolean;
  }> {
    const stagedFiles = this.getStagedFiles()
    
    return stagedFiles.map(fileInfo => {
      let diff = "";
      let error = "";
      
      try {
        diff = this.getFileDiff(fileInfo.path)
      } catch (err) {
        error = (err as Error).message
        diff = `Error getting diff: ${error}`
      }
      
      return {
        file: fileInfo.path,
        diff,
        status: fileInfo.status,
        hasError: !!error
      }
    })
  }
  
  /**
   * Returns the summary of changes for a file in the git repository.
   * 
   * @param {string} filePath The path of the file
   * @returns The summary of changes for the file
   */
  public getFileChangeSummary(filePath: string): {
    status: GitFileInfo["status"] | "";
    exists: boolean;
    diffAvailable: boolean;
    summary?: string;
  } {
    const fileStatus = this.getFileStatus(filePath);
    const exists = this.checkExists(filePath);
    
    let diffAvailable = true;
    let summary = "";
    
    try {
      const diff = this.getFileDiff(filePath)
      if (diff) {
        const lines = diff.split("\n")
        const added = lines.filter(line => line.startsWith("+") && !line.startsWith("+++")).length;
        const deleted = lines.filter(line => line.startsWith("-") && !line.startsWith("---")).length;
        
        summary = `+${added} -${deleted}`
      }
    } catch (error) {
      diffAvailable = false
      summary = `Error getting diff: ${(error as Error).message}`
    }
    
    return {
      status: fileStatus,
      exists,
      diffAvailable,
      summary
    }
  }
  
  /**
   * Stages a file in the git repository.
   * 
   * @param {string} filePath The path of the file to stage
   */
  public stagedFile(filePath: string): void {
    this.executeGitCommand(["add", filePath])
  }
  
  /**
   * Stages all files in the git repository.
   */
  public stageAll(): void {
    this.executeGitCommand(["add", "."])
  }
  
  /**
   * Unstages a file in the git repository.
   * 
   * @param {string} filePath The path of the file to unstage
   */
  public unstagedFile(filePath: string): void {
    this.executeGitCommand(["restore", "--staged", filePath])
  }
  
  /**
   * Commits the staged changes in the git repository.
   * 
   * @param {string} message The commit message
   * @returns The hash of the committed commit
   */
  public commit(message: string) {
    // Remove the code block delimiters if present
    const cleanMessage = message
      .replace(/^```(?:\w+)?\n/, "")
      .replace(/```$/, "")
      .trim()
    
    if (cleanMessage === "") {
      throw new Error("Commit message cannot be empty")
    }
    
    this.executeGitCommand(["commit", "-F", "-"], {
      input: cleanMessage
    })
    
    return this.executeGitCommand(["rev-parse", "HEAD"])
  }
}