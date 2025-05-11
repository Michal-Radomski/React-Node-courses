import * as dotenv from "dotenv";
dotenv.config();
import { Buffer } from "safe-buffer";
// console.log({Buffer});
import Keygrip from "keygrip";

import { IUserModel } from "../../models/UserModel";

const cookieKey = process.env.Dev_cookieKey as string;
// console.log({ cookieKey });

export const sessionFactory = (
  user: IUserModel
): {
  sessionString: string;
  cookieSig: string;
} => {
  const sessionObject = {
    passport: {
      user: user._id.toString(),
    },
  };

  const keygrip = new Keygrip([cookieKey]);
  // console.log({ keygrip });

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString("base64");
  // console.log({ sessionString });
  const cookieSig = keygrip.sign("session=" + sessionString);
  // console.log({ cookieSig });
  return { sessionString, cookieSig };
};
