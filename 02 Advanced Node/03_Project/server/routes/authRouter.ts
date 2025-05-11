import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

const authRouter: express.Router = express.Router();

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
) as express.Router;

authRouter.get("/auth/google/callback", passport.authenticate("google"), (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.status(302).redirect("/blogs");
}) as express.Router;

authRouter.get("/auth/logout", async (req: Request, res: Response, next: NextFunction) => {
  await req.logOut(async (err) => {
    if (err) {
      console.log({ err });
      return next(err);
    }
  });
  await res.status(302).redirect("/");
}) as express.Router;

authRouter.get("/api/current_user", (req: Request, res: Response) => {
  res.status(200).send(req.user);
}) as express.Router;

export default authRouter;
