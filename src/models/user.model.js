import mongoose from "mongoose";

const nameCollection = 'users'

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

const userModel = mongoose.model(nameCollection, userSchema)
export default userModel