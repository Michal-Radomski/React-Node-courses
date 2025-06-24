import Joi, { CustomValidator } from "joi";

import { password } from "./custom.validation";

export const createUserSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.custom(password).required(),
  }),
};
