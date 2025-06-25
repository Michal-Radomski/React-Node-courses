import bcrypt from "bcryptjs";
import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";
const toJson = require("@meanie/mongoose-to-json");

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
  isPasswordMatch(passport: string): Promise<boolean>;
}

interface IUserModel extends Model<UserI> {
  isEmailTaken(email: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!validator.isStrongPassword(value, { minLength: 10 })) {
          throw new Error(
            "Password should contain at least one uppercase and lowercase letter, number and special character, min 10 characters"
          );
        }
      },
      private: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJson);

userSchema.statics.isEmailTaken = async function (email: string): Promise<boolean> {
  const user: UserI = await this.findOne({ email });
  return !!user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model<UserI, IUserModel>("User", userSchema);

export default User;
