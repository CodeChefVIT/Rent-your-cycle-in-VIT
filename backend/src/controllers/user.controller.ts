/* eslint-disable @typescript-eslint/no-explicit-any */

import { User, UserDocument } from "../models/user.model";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as logger from "../config/logger";
import { Token } from "../models/token.model"
import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";

const namespace = "USER CONTROLLER";

const createToken = async (user: UserDocument) => {
    const accessToken = await jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
        regno: user.regno
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    const refreshToken = await RefreshToken(user);
    return { accessToken, refreshToken };
};

const RefreshToken = async (user:UserDocument) => {
    let expiredAt = new Date();

    expiredAt.setDate(expiredAt.getDate() + 1);

    let _token = v4();
    const refreshToken = await Token.create({
        token: _token,
        user: user._id,
        expiryDate: expiredAt
    })
    return refreshToken;
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        passport.authenticate("login", async (err, user, info) => {
            try {
                if (err) {
                    next(err);
                }
                if (!user) {
                    return res.json({ error: info.message });
                }
                return req.login(user, { session: false }, async (error: any) => {
                    if (error) return next(error);
                    const token = await createToken(user);
                    return res.status(200).json({ 
                        accessToken: {
                            token: token.accessToken,
                            expires: process.env.JWT_EXPIRES_IN
                        },
                        refreshToken: {
                            token: token.refreshToken.token,
                            expires: token.refreshToken.expiryDate
                        }
                     })
                });
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        passport.authenticate("signup", async (err, user, info) => {
            try {
                if (err) {
                    next(err);
                }
                if (!user) {
                    res.json({ message: info.message });
                }
                return res.json({ user });
            } catch(err) {
                return next(err);
            }
        })(req, res, next);
    };

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken: _refreshToken } = req.body;
        const refreshToken = await Token.findOne({ token: _refreshToken });
        if (!refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        // verify its expiration
        if (refreshToken.expiryDate < new Date()) {
            return res.status(401).json({ message: "Refresh token expired" });
        }
        const user = await User.findById(refreshToken.user);
        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }
        const token = await createToken(user);
        await refreshToken.delete();
        return res.status(200).json({
            accessToken: {
                token: token.accessToken,
                expires: process.env.JWT_EXPIRES_IN
            },
            refreshToken: {
                token: token.refreshToken.token,
                expires: token.refreshToken.expiryDate
            }
        });
    } catch (err) {

    }
}
                    

export const profile = async (req: Request, res: Response) => {
    try {
        // use userdocument
        const current_user = req.user as UserDocument;
        const user = await User.findById(current_user.id).populate("owned_bikes", "model company rented current_user").populate("rented_bikes", "model company rented owner");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ 
            data: {
                name: user.name,
                email: user.email,
                regno: user.regno,
                block: user.block,
                room: user.room,
                phone: user.phone,
                owned_bikes: user.owned_bikes, 
            }
         });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { hash, id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }
        if (user.verifyhash !== hash) {
            return res.status(400).json({ message: "Invalid verification link" });
        }
        user.isVerified = true;
        await user.save();
        return res.status(200).json({ message: "User verified" });
    }
    catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
}