import { Schema, Document, model, HookNextFunction } from 'mongoose'
import { hashSync } from 'bcrypt'

export interface IUser extends Document {
    username: string,
    sluggedUsername?: string,
    email: string,
    password: string, 
    showAs?: string,
    active?: Number,
    emailVerified?: Number,
    role?: string, 
    discordId?: Number,
    joinDate?: Date,
    userLocation?: string
}

const User = new Schema({
    username: { type: String, required: true, unique: true },
    sluggedUsername: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    showAs: { type: String, required: true, default: "unset" },
    active: { type: Number, required: true, default: 1 },
    emailVerified: { type: Number, required: true, default: 0 },
    role: { type: String, required: true, default: "User" },
    discordId: { type: Number, required: true, default: 0 },
    joinDate: { type: Date, required: true, default: new Date() },
    userLocation: { type: String, required: true, default: "unset" }
})

User.pre("save", function(this: IUser, next: HookNextFunction) {
    this.password = hashSync(this.password, 10)
    next();
});

export default model<IUser>("awoo_user", User)