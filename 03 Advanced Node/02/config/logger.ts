import winston from "winston";

const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const winstonFormat: winston.Logform.Format = printf(({ level, message, timestamp, stack }): string => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

const logger: winston.Logger = createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: combine(
    timestamp(),
    winstonFormat,
    process.env.NODE_ENV === "development" ? colorize({ all: false }) : uncolorize()
  ),
  transports: [new transports.Console()],
});

export default logger;
