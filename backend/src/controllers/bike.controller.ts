import { Request, Response } from "express";
import { Bike, IBike } from "../models/bike.model";
import { User, UserDocument } from "../models/user.model";
import * as logger from "../config/logger";

const namespace = "BIKE CONTROLLER";

export const createBike = async (req: Request, res: Response) => {
    const { model, company, image } = req.body;
    const owner = req.user;
    try {
        const bike: IBike = await Bike.create({
            model,
            company,
            owner,
            image
        });
        const user: UserDocument = await User.findById(owner);
        user.owned_bikes.push(bike._id);
        await user.save();
        return res.status(201).json({ bike });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const getBikes = async (req: Request, res: Response) => {
    try {
        const bikes = await Bike.find({}).populate("owner", "name email regno block room phone").populate("current_renter", "name email regno block room phone");
        // populate owner details
        
        return res.status(200).json({ bikes: bikes });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const rentABike = async (req: Request, res: Response) => { // checkout a bike
    const { id } = req.body;
    try {
        const current_renter = req.user as UserDocument;
        const bike = await Bike.findById(id).populate("owner", "name email regno block room phone");
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        if (bike.rented) {
            return res.status(400).json({ message: "Bike already rented" });
        }
        if (bike.owner.toString() === current_renter.id) {
            return res.status(400).json({ message: "You can't rent your own bike" });
        }
        bike.rented = true;
        bike.current_user = current_renter.id;
        await bike.save();
        return res.status(200).json({ bike });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const getBikeByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const bike = await Bike.findById(id).populate("owner", "name email regno block room phone").populate("current_renter", "name email regno block room phone");
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        return res.status(200).json({ bike });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const removeBike = async (req: Request, res: Response) => {
    try {
        const current_user = req.user as UserDocument;
        const { id } = req.params;
        const bike = await Bike.findById(id);
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        if (bike.owner.toString() !== current_user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await bike.remove();
        return res.status(200).json({ message: "Bike removed" });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const myBikes = async (req: Request, res: Response) => {
    try {
        const current_user = req.user as UserDocument;
        const bike = await Bike.findOne({ owner: current_user.id }).populate("current_renter", "name email regno block room phone");
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        return res.status(200).json({ bike });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};