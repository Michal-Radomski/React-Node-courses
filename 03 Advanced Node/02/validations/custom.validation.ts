import validator from "validator";

export const password = (value: string, helpers: { message: (arg0: string) => string }): string => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      "Password should be at least  8 characters with one uppercase and lowercase letter, number and special character"
    );
  }
  return value;
};
