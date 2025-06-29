import express, { Router } from "express";

import auth from "../middlewares/auth";
import { addComment } from "../controller/comment.controller";

const commentRouter: Router = express.Router();

commentRouter.post("/comment", auth, addComment);

export default commentRouter;
