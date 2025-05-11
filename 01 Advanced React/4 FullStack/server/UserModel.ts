import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IModel extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: [8, "Min password length is 8 characters"] },
  },
  { timestamps: true }
);

// On Save Hook, encrypt password
UserSchema.pre("save", function (this: IModel, next) {
  // console.log("this:", this);
  // get access to the user model
  const user = this;
  // console.log({ user });
  // generate salt then run the callback
  bcrypt.genSalt(12, function (err, salt) {
    if (err) {
      return next(err);
    }
    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // overwrite plaint text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

export default mongoose.model<IModel>("User", UserSchema);
