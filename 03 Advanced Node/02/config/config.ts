import envVarSchema from "../validations/env.validation";

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
