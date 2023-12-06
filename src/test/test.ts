import { Logger } from "../libLog/logger";

const logger = new Logger({ verbose: false });

logger.info("INFO");
logger.warn("WARN");
logger.error("ERROR");

logger.showLogs();
