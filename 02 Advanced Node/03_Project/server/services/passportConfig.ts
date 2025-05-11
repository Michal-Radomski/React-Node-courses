import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "../models/UserModel";
const keys = require("../config/keys");
// console.log({ keys });

interface CustomUser extends Express.User {
  id?: string;
}

passport.serializeUser((user: CustomUser, done) => {
  // console.log("user:", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log({ id });
  User.findById(id).then((user) => {
    // console.log({ user });
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/callback",
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      proxy: true,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
        }).save();
        done(null, user);
      } catch (err) {
        done(err as Error, null as any);
      }
    }
  )
);
