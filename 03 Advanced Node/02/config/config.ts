import envVarSchema from "../validations/env.validation";
import logger from "./logger";

// Validating the environment variables against the schema
const { value: envVars, error } = envVarSchema.validate(process.env);
// console.log("envVars:", envVars);

if (error) {
  logger.error(`Config validation error: ${error.message}`);
}

const config = {
  email: envVars.EMAIL as string,
  emailPassword: envVars.EMAIL_PASSWORD as string,
  port: envVars.PORT as number,
  dbConnection: envVars.DB_CONNECTION as string,
  env: envVars.NODE_ENV as string,
  jwt: {
    secret: envVars.JWT_SECRET as string,
    accessExpirationMinutes: envVars.JWT_EXPIRATION_MINUTES as number,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS as number,
  },
  rateLimiter: {
    maxAttemptsPerDay: envVars.MAX_ATTEMPTS_PER_DAY,
    maxAttemptsByIpUsername: envVars.MAX_ATTEMPTS_BY_IP_USERNAME,
    maxAttemptsPerEmail: envVars.MAX_ATTEMPTS_PER_EMAIL,
  },
  cspOptions: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "'unsafe-inline'"],
    },
    reportOnly: true,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    pass: envVars.REDIS_PASS,
  },
};

export default config;
