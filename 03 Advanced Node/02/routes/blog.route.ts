import express, { Router } from "express";

import { getBlogs, createBlog, uploadFile, getFile, getRecentBlogs, searchBlogs } from "../controller/blog.controller";
import validate from "../middlewares/validate";
import createBlogSchema, { getBlogSchema } from "../validations/blog.validation";
import auth from "../middlewares/auth";
import upload from "../utils/multer";
import { getRecentBlogCache } from "../middlewares/caches/recent-blogs";

const blogRouter: Router = express.Router();

blogRouter.get("/blogs/search", auth, searchBlogs); //* http://localhost:5000/blogs/search?searchQuery=5

blogRouter.get("/blogs", auth, validate(getBlogSchema), getBlogs);
blogRouter.get("/blogs2", auth, getRecentBlogCache, getRecentBlogs); //* V2

blogRouter.post("/blog", auth, validate(createBlogSchema), createBlog);

blogRouter.post("/blog/cover-image", auth, upload.single("coverImage"), uploadFile);

blogRouter.get("/blog/image/:filename", getFile);

export default blogRouter;
