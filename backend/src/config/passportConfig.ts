import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authService } from "../services/auth.service";
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        
        const user = await authService.findOrCreateGoogleUser(profile);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await authService.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
