import chalk from "chalk"
import {formatDate} from "@/utils/formatDate.js";

export const LogLevel = {
  debug: {
    level: () => chalk.bgBlue.whiteBright.bold(` DEBUG `),
    priority: 10,
    color: (text: string) => chalk.blue(text),
  },
  info: {
    level: () => chalk.bgGreen.whiteBright.bold(` INFO `),
    priority: 20,
    color: (text: string) => chalk.green(text),
  },
  warn: {
    level: () => chalk.bgYellow.whiteBright.bold(` WARN `),
    priority: 30,
    color: (text: string) => chalk.yellow(text),
  },
  error: {
    level: () => chalk.bgRed.whiteBright.bold(` ERROR `),
    priority: 40,
    color: (text: string) => chalk.red(text),
  },
  silent: {
    level: () => "",
    priority: -1,
    color: (text: string) => text,
  },
} as const

export type LogLevelLiteral = keyof typeof LogLevel

class Logger {
  private static readonly FORMAT_DATE = "HH:mm:ss";
  private logLevel: LogLevelLiteral = "info";
  private constructor() {}
  public static instance: Logger;

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  private _log(level: LogLevelLiteral, ...args: unknown[]) {
    if (level === 'silent') return;
    if (LogLevel[level].priority < LogLevel[this.logLevel].priority) {
      return;
    }
    const line: unknown[] = [
      this.getDate(),
      LogLevel[level].level(),
      ...args
    ]

    console.log(...line)
  }

  private getDate() {
    return chalk.magenta(`[${formatDate(new Date(), Logger.FORMAT_DATE)}]`)
  }

  public setLevel(logLevel: LogLevelLiteral) {
    this.logLevel = logLevel;
  }

  public info(...args: unknown[]) {
    this._log("info", ...args)
  }

  public debug(...args: unknown[]) {
    this._log("debug", ...args)
  }

  public warn(...args: unknown[]) {
    this._log("warn", ...args)
  }

  public error(...args: unknown[]) {
    this._log("error", ...args)
  }
}

export const logger = Logger.getInstance()
