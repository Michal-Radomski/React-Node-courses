import envVarSchema from "../validations/env.validation";
import logger from "./logger";

// Validating the environment variables against the schema
const { value: envVars, error } = envVarSchema.validate(process.env);
// console.log("envVars:", envVars);

if (error) {
  logger.error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT as number,
  dbConnection: envVars.DB_CONNECTION as string,
  env: envVars.NODE_ENV as string,
  jwt: {
    secret: envVars.JWT_SECRET as string,
    accessExpirationMinutes: envVars.JWT_EXPIRATION_MINUTES as number,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS as number,
  },
};

export default config;
