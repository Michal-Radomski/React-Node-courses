import express, { Router } from "express";

import validate from "../middlewares/validate";
import { createUserSchema } from "../validations/user.validation";
import { login, refreshToken, register } from "../controller/auth.controller";
import { loginSchema, refreshTokenSchema } from "../validations/auth.validation";
import { authLimiter } from "../middlewares/authLimiter";

const authRouter: Router = express.Router();

authRouter.post("/auth/register", validate(createUserSchema), register);

authRouter.post("/auth/login", authLimiter, validate(loginSchema), login);

authRouter.post("/auth/refresh-token", validate(refreshTokenSchema), refreshToken);

export default authRouter;
