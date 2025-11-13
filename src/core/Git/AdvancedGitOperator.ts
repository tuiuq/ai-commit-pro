import { GitOperator } from "./GitOperator.ts";
import { GitChangedSummary, GitFileInfoSummary, GitStatistics } from "./types.ts";

/**
 * AdvancedGitOperator provides additional functionality for git operations.
 */
export class AdvancedGitOperator extends GitOperator {
  /**
   * Get the summary of the changed files in the staged area.
   *
   * @returns {GitChangedSummary} The summary of the changed files.
   */
  public getChanedSummary(): GitChangedSummary {
    const stagedFiles = this.getStagedFiles()
    const statistics: GitStatistics = {
      added: 0,
      deleted: 0,
      modified: 0,
      deletedCount: 0,
    }
    
    const files = stagedFiles.map(fileInfo => {
      const summary = this.getFileChangeSummary(fileInfo.path)
      
      switch (fileInfo.status) {
        case "A":
          statistics.added++;
          break;
        case "D":
          statistics.deletedCount++;
          break;
        case "M":
          statistics.modified++;
          break;
      }
      
      if (summary.summary && !summary.summary.startsWith("Error")) {
        const match = summary.summary.match(/\+(\d+)\s+-(\d+)/) as [string, string, string];
        if (match) {
          statistics.added += parseInt(match[1], 10)
          statistics.deleted += parseInt(match[2], 10)
        }
      }
      
      return {
        path: fileInfo.path,
        status: fileInfo.status,
        summary: summary.summary || "No changes",
      }
    })
    
    return {
      files,
      statistics,
    }
  }
  
  /**
   * Generate a description of the changed files in the staged area.
   * 
   * @returns {string} The description of the changed files.
   */
  public generateAIChangeDescription() {
    const { files, statistics } = this.getChanedSummary()
    
    let description = "代码变更摘要:\n\n"
    
    const fileGroups: Record<string, Array<GitFileInfoSummary>> = {}
    
    files.forEach(file => {
      const extension = file.path.split(".").pop()?.toLowerCase() || "other"
      const fileType = this.getFileType(extension);
      
      if (!fileGroups[fileType]) {
        fileGroups[fileType] = [];
      }
      
      fileGroups[fileType].push(file)
    })
    
    Object.entries(fileGroups).forEach(([fileType, typeFiles]) => {
      description += `${fileType} 文件: \n`;
      typeFiles.forEach(file => {
        const statusText = this.getStatusText(file.status);
        description += `\t- ${file.path}: ${file.summary}`
        if (file.summary && !file.summary.startsWith("Error")) {
          description += `\t(${file.summary})`;
        }
        description += "\n";
      })
      description += "\n"
    })
    
    description += `变更统计:\n`
    description += `\t- 新增文件: ${statistics.added} 个\n`
    description += `\t- 修改文件: ${statistics.modified} 个\n`
    description += `\t- 删除文件: ${statistics.deletedCount} 个\n`
    description += `\t- 新增代码行: ${statistics.added} 行\n`
    description += `\t- 删除代码行: ${statistics.deleted} 行\n`
    
    return description
  }
  
  private getStatusText(status: string) {
    const statusMap: Record<string, string> = {
      "A": "新增",
      "M": "修改",
      "D": "删除",
      "R": "重命名",
      "C": "复制",
      "U": "更新并合并",
      "?": "未追踪",
      "!": "忽略"
    }
    
    return statusMap[status] || status
  }
  
  private getFileType(extension: string): string {
    const typeMap: Record<string, string> = {
      ts: "TypeScript",
      tsx: "TypeScript React",
      js: "JavaScript",
      jsx: "JavaScript React",
      vue: "Vue",
      py: "Python",
      java: "Java",
      cpp: "c++",
      c: "C",
      go: "Go",
      rs: "Rust",
      php: "PHP",
      rb: "Ruby",
      css: "CSS",
      scss: "SCSS",
      less: "LESS",
      html: "HTML",
      json: "JSON",
      xml: "XML",
      md: "Markdown",
      yml: "YAML",
      yaml: "YAML",
      txt: "Text",
    }
    
    return typeMap[extension] || "其他文件"
  }
}