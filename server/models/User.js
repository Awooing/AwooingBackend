const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.Schema({
    username: String,
    email: String,
    password: String, 
    showAs: String,
    active: Number,
    emailVerified: Number,
    role: String, 
    discordId: Number,
    joinDate: Date,
    location: String
})

userSchema.pre("save", next => {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model("User", User)