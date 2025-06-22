import winston from "winston";

const { format, createLogger, transports } = winston;
const { combine, timestamp, printf } = format;

const winstonFormat: winston.Logform.Format = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

const logger: winston.Logger = createLogger({
  level: "info",
  format: combine(timestamp(), winstonFormat),
  transports: [new transports.Console()],
});

export default logger;
