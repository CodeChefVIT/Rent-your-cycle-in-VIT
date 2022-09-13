/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, UserDocument } from "../models/user.model";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as logger from "../config/logger";

const namespace = "USER CONTROLLER";

const createToken = (user: UserDocument) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
        regno: user.regno
    }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const login = async (req: any, res: any, next: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        passport.authenticate("login", async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error("An error occurred.");
                    return res.status(401).json({ message: error.message });
                }
                req.login(user, { session: false }, async (error: any) => {
                    if (error) return next(error);
                    const token = createToken(user);
                    return res.json({ token });
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
};

export const profile = async (req: any, res: any) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};