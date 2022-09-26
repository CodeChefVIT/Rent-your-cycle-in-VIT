import { Request, Response } from "express";
import { Bike, IBike } from "../models/bike.model";
import { User, UserDocument } from "../models/user.model";
import * as logger from "../config/logger";
import { sendEmail } from "../workers/sendEmail.worker";

const namespace = "BIKE CONTROLLER";

export const createBike = async (req: Request, res: Response) => {
    const { model, company, image, price } = req.body;
    const owner = req.user;
    try {
        const bike: IBike = await Bike.create({
            model,
            company,
            owner,
            image,
            price
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
        // TODO  Send email to owner
        const owner = bike.owner as UserDocument;
        const text = `User ${current_renter.name} (${current_renter.regno}) has requested to rent your bike ${bike.model} (${bike.company}). Please login to the website to approve or deny the request`;
        const subject = `Bike Rental Request`;
        await sendEmail(owner.email, text, subject);
        // ! Can Add fcm notification here
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

export const approveRental = async (req: Request, res: Response) => {
    try {
        const { user, id} = req.params;
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const bike = await Bike.findById(id).populate("owner", "name email regno block room phone").populate("current_renter", "name email regno block room phone");
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        if (bike.owner.toString() !== req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        bike.rented = true;
        bike.current_user = user;
        await bike.save();
        const current_renter = bike.current_user as UserDocument;
        const text = `Your request to rent ${bike.model} (${bike.company}) has been approved. Please login to the website to checkout the bike`;
        const subject = `Bike Rental Request Approved`;
        await sendEmail(current_renter.email, text, subject);
        // ! Can Add fcm notification here
        return res.status(200).json({ bike });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
};

export const denyRental = async (req: Request, res: Response) => {
    try {
        const { user, id} = req.params;
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const bike = await Bike.findById(id).populate("owner", "name email regno block room phone").populate("current_renter", "name email regno block room phone");
        if (!bike) {
            return res.status(404).json({ message: "Bike not found" });
        }
        if (bike.owner.toString() !== req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        bike.rented = false;
        bike.current_user = null;
        await bike.save();
        const current_renter = bike.current_user as UserDocument;
        const text = `Your request to rent ${bike.model} (${bike.company}) has been denied. Please login to the website to request another bike`;
        const subject = `Bike Rental Request Denied`;
        await sendEmail(current_renter.email, text, subject);
        // ! Can Add fcm notification here
        return res.status(200).json({ bike });
    } catch (error) {
        logger.error(namespace, error.message, error);
        return res.status(500).json({ message: error.message });
    }
}