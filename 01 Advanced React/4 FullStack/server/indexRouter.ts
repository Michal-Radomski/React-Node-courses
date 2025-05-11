import express, { RequestHandler } from "express";
import passport from "passport";

//* It is necessary to work!
const passportService = require("./services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const indexRouter: express.Router = express.Router();

import { getMessage, signIn, signUp } from "./controllers/authentication";

indexRouter.post("/signup", signUp);

indexRouter.get("/", requireAuth, getMessage);

indexRouter.post("/signin", requireSignin, signIn as unknown as RequestHandler);

export default indexRouter;
