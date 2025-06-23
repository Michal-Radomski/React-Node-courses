import express, { Router } from "express";

import { getBlogs, createBlog } from "../controller/blog.controller";
import validate from "../middlewares/validate";
import createBlogSchema from "../validations/blog.validation";

const blogRouter: Router = express.Router();

blogRouter.get("/blogs", getBlogs);
// blogRouter.post("/blog", createBlog);
blogRouter.post("/blog", validate(createBlogSchema), createBlog);

export default blogRouter;
