import { Schema, model } from 'mongoose'

const User = new Schema({
    username: { type: String, required: true, unique: true },
    sluggedUsername: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    showAs: { type: String, required: true },
    active: { type: Number, required: true, default: 1 },
    emailVerified: { type: Number, required: true, default: 0 },
    role: { type: String, required: true, default: "User" },
    discordId: { type: Number, required: true, default: 0 },
    joinDate: { type: Date, required: true, default: new Date() },
    location: { type: String, required: true, default: "unset" }
})

module.exports = model("awoo_user", User)