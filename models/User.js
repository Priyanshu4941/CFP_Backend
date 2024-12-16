const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: false, // This can be false since OTP is only needed during registration and is cleared afterward
    },
    otpExpiry: {
        type: Date,
        required: false, // This can also be false for the same reason
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
