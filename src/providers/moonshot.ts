import fetch from "node-fetch";

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
}

const API_URL = process.env.MOONSHOT_API_URL
const API_KEY = process.env.MOONSHOT_API_KEY
const MODEL = process.env.MOONSHOT_MODEL

if (!API_URL || !API_KEY || !MODEL) {
  console.warn("MOONSHOT_API_URL or MOONSHOT_API_KEY or MODEL is not set, AI calls will fail.")
}

export async function generateCommitMessage(prompt: string, opts: GenerateOptions = {}) {
  if (!API_URL || !API_KEY || !MODEL) {
    throw new Error("Missing MOONSHOT_API_URL or MOONSHOT_API_KEY or MODEL, Please set it in the environment variable.")
  }

  if (API_URL === "" || API_KEY === "" || MODEL === "") {
    throw new Error("MOONSHOT_API_URL, MOONSHOT_API_KEY, and MODEL must not be empty strings.")
  }

  const body = {
    model: MODEL,
    prompt,
    temperature: opts.temperature ?? 0.2,
    max_tokens: opts.maxTokens ?? 128
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      let errorText: string;
      try {
        const errorData = await res.json();
        errorText = JSON.stringify(errorData);
      } catch (e) {
        errorText = await res.text();
      }
      throw new Error(`Moonshot API error: ${res.status}: ${errorText}`)
    }

    const data: any = await res.json();
    if (typeof data === "string") {
      return data
    }

    if (data.message && typeof data.message === "string") {
      return data.message
    }

    if (data.choices && Array.isArray(data.choices) && data.choices[0]?.text) {
      return data.choices[0].text
    }

    if (data.choices && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
      return data.choices[0].message.content
    }

    if (data.output && typeof data.output === "string") {
      return data.output
    }

    return JSON.stringify(data);
  } catch (e) {
    throw new Error(`Failed to generate a commit message: ${(e as Error).message}`)
  }
}
