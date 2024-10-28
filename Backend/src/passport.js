import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "./Models/user.models.js";
import { sendWelcomeEmail } from "./Controllers/user.controllers.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    prompt: 'select_account'
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Generate a unique username based on the profile display name
          user = await User.findOne({ emailId: profile.emails[0].value });
          if(user){
            return done(null, user);
          }
          let userName = profile.displayName.replace(/\s+/g, "").toLowerCase();
          const existingusername = await User.findOne({ userName });
          if (existingusername) {
            userName += Date.now().toString().slice(-4); // Append timestamp to ensure uniqueness
          }
          user = await User.create({
            googleId: profile.id,
            fullName: profile.displayName,
            emailId: profile.emails[0].value,
            avatar: profile.photos[0].value,
            isEmailVerified: true,
            userName: userName,
          });
          await sendWelcomeEmail(user);
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
