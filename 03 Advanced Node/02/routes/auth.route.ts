import express, { Router } from "express";

import validate from "../middlewares/validate";
import { createUserSchema } from "../validations/user.validation";
import { login, register } from "../controller/auth.controller";
import { loginSchema } from "../validations/auth.validation";

const authRouter: Router = express.Router();

authRouter.post("/auth/register", validate(createUserSchema), register);

authRouter.post("/auth/login", validate(loginSchema), login);

export default authRouter;
