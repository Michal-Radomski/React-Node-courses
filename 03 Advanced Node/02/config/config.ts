import envVarSchema from "../validations/env.validation";
import logger from "./logger";

// Validating the environment variables against the schema
const { value: envVars, error } = envVarSchema.validate(process.env);
// console.log("envVars:", envVars);

if (error) {
  logger.error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.NODE_ENV,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};

export default config;
