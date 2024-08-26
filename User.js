const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: { type: String },
    pin: { type: String },
    email: { type: String },
    currency: { type: String }


}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)