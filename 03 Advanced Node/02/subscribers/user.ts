import config from "../config/config";
import { UserI } from "../models/user.model";
import transporter from "../utils/email-transporter";

const signUp = async (user: UserI): Promise<void> => {
  await transporter.sendMail({
    from: config.email,
    to: user.email,
    subject: "Successfully registered",
    text: "Thanks for signing up",
  });
};

export default signUp;
