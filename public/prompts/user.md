以下是本次提交的代码变更，请分析改动内容并生成符合规范的中文 Commit Message。

【任务要求】
1. 根据改动内容自动判断 type（feat、fix、refactor 等）。
2. 根据文件路径或模块名推断 scope。
3. 若改动简单，仅输出首行。
4. 若改动复杂，可补充 body。
5. 使用{{lang}}输出。

【相关文件】
{{files}}

{{#if customContext}}
【上下文说明】
{{customContext}}
{{#endif}}

【代码改动内容】
{{diff}}

请输出符合规范的完整 Commit Message。