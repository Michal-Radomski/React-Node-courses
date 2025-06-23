import express, { Router } from "express";

import validate from "../middlewares/validate";
import { createUserSchema } from "../validations/user.validation";
import { register } from "../controller/auth.controller";

const authRouter: Router = express.Router();

authRouter.post("/auth/register", validate(createUserSchema), register);

export default authRouter;
