const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "customer",
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean, // Use Mongoose Boolean
        default: true,
    },
}, { timestamps: true });

// Export user model
const User = mongoose.model("User", userSchema);
module.exports = User;