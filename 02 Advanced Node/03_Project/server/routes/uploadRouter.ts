import express, { Request, Response, Router } from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

import { requireLogin } from "./../middlewares/requireLogin";
const keys = require("../config/keys");

const client = new S3Client({
  region: process.env.AWS_Region,
  credentials: {
    accessKeyId: keys.AWS_accessKey,
    secretAccessKey: keys.AWS_secretKeyID,
  },
});
// console.log("client:", client);

const uploadRouter: Router = express.Router();

interface CustomUser extends Express.User {
  id?: string;
}

export interface CustomRequest extends Request {
  user?: CustomUser;
}

uploadRouter.get("/api/upload", requireLogin, async (req: CustomRequest, res: Response) => {
  console.log("req.ip:", req.ip);

  const key = `${req.user!.id!}/${uuidv4()}.jpg`;
  // console.log("key:", key);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_Bucket_Name,
    Key: key,
    ContentType: "image/jpg",
  });
  // console.log("command:", command);

  const url = await getSignedUrl(client, command, { expiresIn: 180 });
  // console.log({ url });

  await res.status(200).send({ url, key });
}) as Router;

export default uploadRouter;
