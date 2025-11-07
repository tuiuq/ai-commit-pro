export class PromptTemplate<P extends object = object> {
  private readonly ifBlockRegex = /\{\{#if\s+([a-zA-Z0-9_]+)\s*\}\}([\s\S]*?)\{\{#endif\s*\}\}/g;
  private readonly variableRegex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

  constructor(private prompt: string, private promptData: P) {
    this.processTemplate();
  }
  
  private processTemplate(): void {
    this.prompt = this.prompt.replace(
      this.ifBlockRegex,
      (_, condition: keyof P, content: string) => {
        return this.promptData[condition] ? content : "";
      }
    )
    
    this.prompt = this.prompt.replace(
      this.variableRegex,
      (_, key: keyof P) => {
        const value = this.promptData[key];
        if (Array.isArray(value)) {
          return value.join("\n");
        }
        return String(value ?? "")
      }
    )
  }
  
  public toString(): string {
    return this.prompt.trim();
  }
}