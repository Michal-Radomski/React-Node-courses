import joi from "joi";
import * as dotenv from "dotenv";
dotenv.config();

// Defining a schema for our environment variables using Joi
const envVarSchema = joi
  .object({
    // DB_CONNECTION must be a string and is required
    DB_CONNECTION: joi.string().required(),
    // PORT must be a positive number, defaulting to 5000 if not provided
    PORT: joi.number().positive().default(5000),
  })
  .unknown(); // Allow other unknown environment variables
// console.log("envVarSchema:", envVarSchema);

// Validating the environment variables against the schema
const { value: envVars, error } = envVarSchema.validate(process.env);
// console.log("envVars:", envVars);

if (error) {
  console.error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
};

export default config;
