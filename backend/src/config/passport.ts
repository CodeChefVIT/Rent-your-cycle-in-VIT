import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy , ExtractJwt } from "passport-jwt";

import { User, UserDocument } from "../models/user.model";
import { sendEmail } from "../workers/sendEmail.worker";
// import passport.ts


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
});

// using email and pass
passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user: UserDocument = await User.findOne({ email });
        if (!user) {
            return done(undefined, false, { message: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(undefined, false, { message: "Incorrect password" });
        }
        return done(undefined, user, { message: "Logged in successfully" });
    } catch (err) {
        return done(err);
    }
}));

passport.use("signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user: UserDocument = await User.findOne({ email });
        if (user) {
            return done(undefined, false, { message: "User already exists" });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return done(undefined, false, { message: "Passwords do not match" });
        }
        const { name, regno, block, room, phone, wa_number } = req.body;
        const verifyhash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const newUser = new User({
            name,
            email,
            regno,
            password,
            verifyhash,
            block,
            room,
            phone,
            wa_number
        });
        await newUser.save();
        // const emailSend = await sendEmail(email, "Welcome to Rent A Cycle", "Please Verify Email");
        return done(undefined, newUser, { message: "Signed up successfully" });
    } catch (err) {
        return done(err);
    }
}));


passport.use(
    new JWTStrategy (
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          console.log(token);
          return done(null, token);
        } catch (error) {
          done(error);
        }
      }
    )
);

export default passport;