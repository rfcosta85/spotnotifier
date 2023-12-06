export interface ILogMessage {
  message: string;
  type: "info" | "warn" | "error";
  timestamp: Date;
}
