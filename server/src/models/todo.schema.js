import mongoose from "mongoose";
import User from "./user.schema.js";


const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Todo name is required"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {timestamps: true})

export default mongoose.model("Todo", todoSchema)