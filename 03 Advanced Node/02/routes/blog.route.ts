import express, { Router } from "express";

import { getBlogs, createBlog, uploadFile } from "../controller/blog.controller";
import validate from "../middlewares/validate";
import createBlogSchema, { getBlogSchema } from "../validations/blog.validation";
import auth from "../middlewares/auth";
import upload from "../utils/multer";

const blogRouter: Router = express.Router();

blogRouter.get("/blogs", auth, validate(getBlogSchema), getBlogs);

blogRouter.post("/blog", auth, validate(createBlogSchema), createBlog);

blogRouter.post("/blog/cover-image", auth, upload.single("coverImage"), uploadFile);

export default blogRouter;
