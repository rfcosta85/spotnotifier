"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(config = { verbose: false }) {
        this.queue = [];
        this.config = config;
    }
    info(message) {
        this.queue.push({ message, type: "info", timestamp: new Date() });
        if (this.config.verbose) {
            console.log(message);
        }
    }
    warn(message) {
        this.queue.push({ message, type: "warn", timestamp: new Date() });
        if (this.config.verbose) {
            console.warn(message);
        }
    }
    error(message) {
        this.queue.push({ message, type: "error", timestamp: new Date() });
        if (this.config.verbose) {
            console.error(message);
        }
    }
    setConfig(config) {
        this.config = config;
    }
    showLogs() {
        this.queue.forEach((log) => {
            console[log.type]({
                message: log.message,
                timestamp: log.timestamp.toLocaleDateString(),
            });
        });
    }
}
exports.Logger = Logger;
exports.default = new Logger();
