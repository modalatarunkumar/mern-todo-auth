import asyncHandler from "../service/asyncHandler";
import CustomError from "../service/CustomError";
import Todo from "../models/todo.schema.js";


export const createTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {name} = req.body;

    if(!name){
        throw new CustomError("Please give todo name", 400);
    }

    // check if todo with same name already exists for this user

    const existingTodo = await Todo.findOne({userId:user.id,name,isCompleted:false, isDeleted:false})
    if(existingTodo){
            throw new CustomError("Todo already exists", 400)
    }
    // create new Todo
    const newTodo = await Todo.create({name,userId:user.id})

    res.status(200).json({
        success: true,
        message: "Todo created successfully",
        data: newTodo
    })
})


export const updateTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id:updateId} = req.params;
    const {name} = req.body;

    if(!name){
        throw new CustomError("Please give name to update", 400);
    }
    
    const existingTodo = await Todo.findOne({userId:user.id, name, isCompleted: false, isDeleted: false});

    if(existingTodo){
        throw new CustomError("Todo name already exists", 400);
    }
    
    // const udpatedTodo = await Todo.findByIdandUpdate({id:updateId}, name, {runValidators: false})
    const todo = await Todo.findOne({_id:updateId, userId:user.id, isDeleted:false})
    if(!todo){
        throw new CustomError("Todo not found", 400)
    }
    todo.name = name
    await todo.save()
    
    res.status(200).json({
        success: true,
        message: "updated successfully"
    })
})

export const deleteTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id} = req.params;

    const todo = await Todo.findOne({id, userId:user.id, isDeleted: false});

    if(!todo){
        throw new CustomError("Todo not found to delete", 400)
    }
    todo.isDeleted= true;
    todo.deletedAt = new Date();
    await todo.save();

    res.status(200).json({
        success:true,
        message: "Deleted successfully"
    })
})

export const toggleTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id:todoId} = req.params;
    
    const todo = await Todo.findOne({_id: todoId, userId:user.id, isDeleted: false})
    if(!todo){
        throw new CustomError("there is no todo to toggle", 400);
    }
    
    todo.isCompleted = !todo.isCompleted;
    await todo.save()
    res.status(200).json({
        success: true,
        message: `Todo ${todo.isCompleted? "completed": "marked incomplete"}`
    })
})


export const getTodos = asyncHandler(async (req, res) =>{
    const {user} = req;
    const todo = await Todo.find({userId:user.id, isDeleted: false});

    res.status(200).json({
        success:true,
        data: todo
    })
})