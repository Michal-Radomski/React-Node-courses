import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
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
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password should contain at least one uppercase and lowercase letter, number and special character"
          );
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email: string): Promise<boolean> {
  const user: UserI = await this.findOne({ email });
  return !!user;
};

const User = mongoose.model<UserI, IUserModel>("User", userSchema);

export default User;
