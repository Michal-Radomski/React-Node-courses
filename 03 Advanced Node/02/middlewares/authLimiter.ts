import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { RateLimiterMongo } from "rate-limiter-flexible";

import config from "../config/config";
import ApiError from "../utils/ApiError";

const rateLimiterOptions = {
  storeClient: mongoose.connection,
  blockDuration: 60 * 60 * 24, // 24h
  dbName: "blog_app",
};

const emailIpBruteLimiter = new RateLimiterMongo({
  ...rateLimiterOptions,
  points: config.rateLimiter.maxAttemptsByIpUsername,
  duration: 60 * 10, // 10 minutes
});

const slowerBruteLimiter = new RateLimiterMongo({
  ...rateLimiterOptions,
  points: config.rateLimiter.maxAttemptsPerDay,
  duration: 60 * 60 * 24, // 24h
});

const emailBruteLimiter = new RateLimiterMongo({
  ...rateLimiterOptions,
  points: config.rateLimiter.maxAttemptsPerEmail,
  duration: 60 * 60 * 24, // 24h
});

export const authLimiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const ipAddr = req.connection.remoteAddress as string;
  // console.log("ipAddr:", ipAddr);

  const emailIpKey = `${req.body.email}_${ipAddr}`;
  const [slowerBruteRes, emailIpRes, emailBruteRes] = await Promise.all([
    slowerBruteLimiter.get(ipAddr),
    emailIpBruteLimiter.get(emailIpKey),
    emailBruteLimiter.get(req.body.email),
  ]);

  let retrySeconds = 0;

  if (slowerBruteRes && slowerBruteRes.consumedPoints >= config.rateLimiter.maxAttemptsPerDay) {
    retrySeconds = Math.floor(slowerBruteRes.msBeforeNext / 1000) || 1;
  } else if (emailIpRes && emailIpRes.consumedPoints >= config.rateLimiter.maxAttemptsByIpUsername) {
    retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1;
  } else if (emailBruteRes && emailBruteRes.consumedPoints >= config.rateLimiter.maxAttemptsPerEmail) {
    retrySeconds = Math.floor(emailBruteRes.msBeforeNext / 1000) || 1;
  }

  if (retrySeconds > 0) {
    res.set("Retry-After", String(retrySeconds));
    return next(new ApiError(httpStatus.TOO_MANY_REQUESTS, "Too many requests"));
  }

  next();
};
