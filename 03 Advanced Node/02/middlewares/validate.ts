import { NextFunction, Request, Response } from "express";
import joi from "joi";

import ApiError from "../utils/ApiError";

// Middleware function to validate the request against a schema
const validate = (schema: { body: joi.ObjectSchema<any> }) => (req: Request, _res: Response, next: NextFunction) => {
  // Extract the keys from the schema
  const keys = Object.keys(schema);
  // console.log("keys:", keys);

  // Reduce the request object to only the relevant keys
  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key as keyof typeof obj] = req[key as keyof typeof obj];
    }
    return obj;
  }, {});

  // Validate the object against the schema
  const { value, error } = joi.compile(schema).validate(object);
  console.log("value:", value);

  // If there is an error, respond with a 400 status and the error details
  // if (error) {
  //   const errors = error.details.map((detail) => {
  //     return { key: detail.context?.key, message: detail.message };
  //   });
  //   next({ statusCode: 400, message: errors });
  //   return res.status(400).send({ error: true, errors });
  // }
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(",");
    next(new ApiError(400, errors));
  }

  // If no error, call next to proceed to the controller
  return next();
};

export default validate;
