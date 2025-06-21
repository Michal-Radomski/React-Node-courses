import joi from "joi";

const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
  }),
};

export default createBlogSchema;
