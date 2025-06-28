import joi from "joi";

import { objectId } from "./custom.validation";

const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    createdBy: joi.string().custom(objectId).required(),
    coverImage: joi.string(),
  }),
};

export default createBlogSchema;

export const getBlogSchema = {
  body: joi.object({
    userId: joi.string().required().custom(objectId),
  }),
};
