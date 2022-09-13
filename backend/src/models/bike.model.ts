import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface IBike extends Document {
    model: string;
    company: string;
    owner: UserDocument["_id"];
    image: string;
    booked: boolean;
}

const BikeSchema: Schema = new Schema({
    model: { type: String, required: true },
    company: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
    booked: { type: Boolean, required: true },
});

export default mongoose.model<IBike>("Bike", BikeSchema);