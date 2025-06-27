/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi, { CustomValidator, ErrorReport, LanguageMessages } from "joi";
import validator from "validator";

export const password: CustomValidator<any, any> = (
  value: string,
  helpers: Joi.CustomHelpers<any>
): ErrorReport | string => {
  if (!validator.isStrongPassword(value, { minLength: 10 })) {
    return helpers.message(
      "Password should be at least 10 characters with one uppercase and lowercase letter, number and special character" as unknown as LanguageMessages
    );
  }
  return value;
};

export const objectId: CustomValidator<any, any> = (value, helpers) => {
  if (!value.match(/^[1-9a-fA-F]{24}$/)) {
    return helpers.message("'{{#label}}' must be a valid mongo id." as unknown as LanguageMessages);
  }
  return value;
};
