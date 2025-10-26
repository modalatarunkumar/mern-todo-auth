import mongoose from "mongoose";


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
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deletedAt: {
        type: Date,
        default: null
    },
    
}, {timestamps: true})

export default mongoose.model("Todo", todoSchema)