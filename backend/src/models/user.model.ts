import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type pastRented = {
    bike: mongoose.Types.ObjectId[],
    start: { type: Date },
    end: { type: Date }
}

export type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    regno: string;
    password: string;
    block: string;
    room: string;
    phone: string;
    verifyhash: string;
    isVerified: boolean;
    owned_bikes: mongoose.Types.ObjectId[];
    rented_bikes: pastRented[];
    comparePassword: comparePasswordFunction;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;

const userSchema : mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regno: { type: String, required: true },
    password: { type: String, required: true },
    verifyhash: { type: String },
    isVerified: { type: Boolean, default: false },
    block: { type: String, required: true },
    room: { type: Number, required: true },
    phone: { type: String, required: true },
    owned_bikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bike" }],
    past_rented: [
        {
            bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike" },
            start: { type: Date },
            end: { type: Date }
        }
    ]
});

userSchema.pre("save", async function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

const comparePassword: comparePasswordFunction = async function (candidatePassword) {
    const user = this as UserDocument;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);
