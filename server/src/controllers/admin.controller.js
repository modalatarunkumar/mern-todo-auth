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

export const getAUserTodos = asyncHandler(async (req, res) => {
    const {id: userId} = req.params;

    // optional but good practice
    const userExists = await User.findById(userId).select("_id");
    if(!userExists){
        throw new CustomError("User not found", 404);
    }

    const todos = await Todo.find({
        userId, 
        isDeleted: false
    })
    .select("_id name isCompleted createdAt updatedAt")
    .sort({createdAt: -1});

    res.status(200).json({
        success: true,
        data: {todos, userId}
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

    const todo = await Todo.findOne({_id:id, isDeleted: false});
    if(!todo){
        throw new CustomError("Todo not found", 404);
    }

    todo.isDeleted = true;
    todo.deletedAt = new Date();
    await todo.save();

    res.status(200).json({
        success: true,
        message: "Todo deleted by admin",
        data: {todoId:id, userId: todo.userId}
    })
})