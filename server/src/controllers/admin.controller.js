import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/CustomError.js";
import User from "../models/user.schema.js";
import Todo from "../models/todo.schema.js";

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("_id name email role createdAt");

    res.status(200).json({
        success: true,
        data: users
    })
})

export const getAllUsersWithTodos = asyncHandler(async (req, res) => {
    // todo-centric way increases payload
    // const todos = await Todo.find({isDeleted: false}).populate("userId");
    // user-centric way
    const users = await User.find()
    .select("_id name email role")
    .populate({
        path: "todos",
        match: {isDeleted: false},
        select: "_id name isCompleted createdAt"
    });
    res.status(200).json({
        success: true,
        data: users
    })
})

export const adminDeleteTodo = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const todo = await Todo.findById(id);
    if(!todo){
        throw new CustomError("Todo not found", 404);
    }

    todo.isDeleted = true;
    todo.deletedAt = new Date();
    await todo.save();

    res.status(200).json({
        success: true,
        message: "Todo deleted by admin",
        data: {id}
    })
})