import express, { Router } from "express";

import { getBlogs, createBlog } from "../controller/blog.controller";
import validate from "../middlewares/validate";
import createBlogSchema from "../validations/blog.validation";
import auth from "../middlewares/auth";

const blogRouter: Router = express.Router();

blogRouter.get("/blogs", auth, getBlogs);
// blogRouter.post("/blog", createBlog);
blogRouter.post("/blog", auth, validate(createBlogSchema), createBlog);

export default blogRouter;
