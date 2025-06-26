import joi from "joi";

import { objectId } from "./custom.validation";

const createBlogSchema = {
  body: joi.object({
    title: joi.string().required().messages({ "any.required": `tittle is a required field` }),
    description: joi.string().required().messages({ "any.required": `description is a required field` }),
    createdBy: joi.string().required().custom(objectId),
  }),
};

export default createBlogSchema;

export const getBlogSchema = {
  body: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
};
