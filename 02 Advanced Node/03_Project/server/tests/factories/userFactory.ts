import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import User from "../../models/UserModel";
// console.log("User:", User);

const mongoURI = process.env.Dev_mongoURI as string;
// console.log({ mongoURI });
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error: Error) => console.log("Mongo DB Error => ", error));

afterAll(async () => {
  await mongoose.disconnect();
  //* Is it necessary?
  // await mongoose.connection.close();
});

export const userFactory = () => {
  return new User({}).save();
};
