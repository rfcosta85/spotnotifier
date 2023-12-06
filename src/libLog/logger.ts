import { IConfig } from "./interfaces/config.interface";
import { ILogMessage } from "./interfaces/log-message.interface";

export class Logger {
  private config: IConfig;
  private queue: ILogMessage[] = [];

  constructor(config: IConfig = { verbose: false }) {
    this.config = config;
  }

  public info(message: string) {
    this.queue.push({ message, type: "info", timestamp: new Date() });
    if (this.config.verbose) {
      console.log(message);
    }
  }

  public warn(message: string) {
    this.queue.push({ message, type: "warn", timestamp: new Date() });
    if (this.config.verbose) {
      console.warn(message);
    }
  }

  public error(message: string) {
    this.queue.push({ message, type: "error", timestamp: new Date() });
    if (this.config.verbose) {
      console.error(message);
    }
  }

  public setConfig(config: IConfig) {
    this.config = config;
  }

  public showLogs() {
    this.queue.forEach((log) => {
      console[log.type]({
        message: log.message,
        timestamp: log.timestamp.toLocaleDateString(),
      });
    });
  }
}

export default new Logger();
