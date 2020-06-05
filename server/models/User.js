const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.Schema({
    username: String,
    sluggedUsername: String,
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

User.pre("save", next => {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model("awoo_user", User)