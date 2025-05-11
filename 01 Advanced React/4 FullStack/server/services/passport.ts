import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import UserModel from "../UserModel";
const secretKey = process.env.secret_key as string;
// console.log({ secretKey });

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secretKey,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // console.log({ payload, done, jwtOptions });
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other otherwise, call done without a user object
  UserModel.findById(payload.sub, function (err: Error, user: boolean | Express.User | undefined) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // If it is the correct email and password otherwise, call done with false
  UserModel.findOne({ email: email }, function (err: Error, user: boolean | Express.User | undefined | any) {
    // console.log({ user });

    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // Compare passwords - is `password` equal to user.password?
    user.comparePassword(password, user.password, function (err: Error, isMatch: boolean) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
