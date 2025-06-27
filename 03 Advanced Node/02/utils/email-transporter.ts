import nodemailer from "nodemailer";

import config from "../config/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
});

export default transporter;
