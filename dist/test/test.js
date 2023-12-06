"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../libLog/logger");
const logger = new logger_1.Logger({ verbose: false });
logger.info("INFO");
logger.warn("WARN");
logger.error("ERROR");
logger.showLogs();
