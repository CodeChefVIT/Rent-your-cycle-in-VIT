import { Router } from "express";
import passport from "passport";
import { login, profile, signup, refreshToken } from "../../../controllers/user.controller";

const router = Router();


router.post("/signup", signup);

router.post("/login", login);
router.get("/profile", passport.authenticate("jwt", { passReqToCallback: true, session: false }), profile);
router.post('/refreshToken', refreshToken);

export default router;