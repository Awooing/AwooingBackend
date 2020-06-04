const mongoose = require('mongoose')

const Verification = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    type: String
})

module.exports = mongoose.model("Verification", Verification)