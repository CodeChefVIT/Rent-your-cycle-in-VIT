import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface IBike extends Document {
    model: string;
    company: string;
    owner: UserDocument["_id"];
    current_user: UserDocument["_id"];
    image: string;
    price: number;
    rented: boolean;
}

const BikeSchema: Schema = new Schema({
    model: { type: String, required: true },
    company: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    current_user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rented: { type: Boolean, default: false },
});

export const Bike = mongoose.model<IBike>("Bike", BikeSchema);