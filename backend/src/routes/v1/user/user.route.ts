import { Router } from "express";
import passport from "passport";
import { login, profile } from "../../../controllers/user.controller";

const router = Router();


router.post("/signup", passport.authenticate("signup", { session: false }), async (req, res) => {
    res.status(200).json({
        message: "Signup successful",
        user: req.user
    });
});

router.post("/login", login);
router.get("/profile", passport.authenticate("jwt", { session: false }), profile);

export default router;