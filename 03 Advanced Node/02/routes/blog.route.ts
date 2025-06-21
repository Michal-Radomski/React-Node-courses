import express, { Router } from "express";

import { getBlogs, createBlog } from "../controller/blog.controller";

const blogRouter: Router = express.Router();

blogRouter.get("/blogs", getBlogs);
blogRouter.post("/blog", createBlog);

export default blogRouter;
