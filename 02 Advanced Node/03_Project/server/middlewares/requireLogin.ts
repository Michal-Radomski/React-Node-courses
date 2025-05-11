import { Request, Response, NextFunction, RequestHandler } from "express";

export const requireLogin: RequestHandler = (req: Request, res: Response, next: NextFunction): Object | void => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  next();
};
