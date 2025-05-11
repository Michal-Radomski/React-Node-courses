import express, { Request, Response } from "express";
import { Schema } from "mongoose";

import { requireLogin } from "../middlewares/requireLogin";
import Blog, { IBlogModel } from "../models/BlogModel";
import { cleanCache } from "../middlewares/clearCache";

const blogRouter: express.Router = express.Router();

interface CustomUser extends Express.User {
  id?: Schema.Types.ObjectId;
}

export interface CustomRequest extends Request {
  user?: CustomUser;
}

blogRouter.get("/api/blogs/:id", requireLogin, async (req: CustomRequest, res: Response): Promise<void> => {
  const blog: IBlogModel | null = await Blog.findOne({
    _user: req!.user!.id!,
    _id: req.params.id,
  });
  res.status(200).send(blog);
}) as express.Router;

blogRouter.get("/api/blogs", requireLogin, cleanCache, async (req: CustomRequest, res: Response): Promise<any> => {
  // @ts-ignore
  const blogs = await Blog.find({ _user: req.user?.id }).cache({ key: req.user?.id });
  // console.log("blogs:", blogs);
  return res.status(200).send(blogs);
}) as express.Router;

blogRouter.post("/api/blogs", requireLogin, async (req: CustomRequest, res: Response): Promise<void> => {
  const { title, content, imageUrl } = req.body;
  // console.log({ imageUrl });

  const blog: IBlogModel = new Blog({
    imageUrl,
    title,
    content,
    _user: req!.user!.id,
  });

  try {
    await blog.save();
    res.status(201).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
  //  finally {
  //   clearCache(req.user!.id!);
  // }
}) as express.Router;

export default blogRouter;
