import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/CustomError.js";
import Todo from "../models/todo.schema.js";


export const createTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {name} = req.body;
    const userId = user.id || user._id;

    if(!name){
        throw new CustomError("Please give todo name", 400);
    }

    // check if todo with same name already exists for this user

    const existingTodo = await Todo.findOne({userId,name,isCompleted:false, isDeleted:false})
    if(existingTodo){
            throw new CustomError("Todo already exists", 400)
    }
    // create new Todo
    const newTodo = await Todo.create({name,userId:user.id})
    const {_id, name: todoName, isCompleted} = newTodo.toObject()

    res.status(200).json({
        success: true,
        message: "Todo created successfully",
        data: {_id, name: todoName, isCompleted}
    })
})


export const updateTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id:updateId} = req.params;
    const {name} = req.body;
    const userId = user.id || user._id;

    if(!name){
        throw new CustomError("Please give name to update", 400);
    }
    
    const existingTodo = await Todo.findOne({userId, name, isCompleted: false, isDeleted: false, _id: {$ne: updateId}});

    if(existingTodo){
        throw new CustomError("Todo name already exists", 400);
    }
    
    // const udpatedTodo = await Todo.findByIdandUpdate({_id:updateId}, name, {runValidators: false})
    const todo = await Todo.findOne({_id:updateId, userId, isDeleted:false})
    if(!todo){
        throw new CustomError("Todo not found", 400)
    }
    todo.name = name
    await todo.save()
    const {_id, name: todoName, isCompleted} = todo.toObject();
    
    res.status(200).json({
        success: true,
        message: "updated successfully",
        data: {_id, name: todoName, isCompleted}
    })
})

export const deleteTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id} = req.params;
    const userId = user.id || user._id;

    const todo = await Todo.findOne({_id:id , userId, isDeleted: false});

    if(!todo){
        throw new CustomError("Todo not found to delete", 400)
    }
    todo.isDeleted= true;
    todo.deletedAt = new Date();
    await todo.save();

    res.status(200).json({
        success:true,
        message: "Deleted successfully",
        data: {id}
    })
})

export const toggleTodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const {id:todoId} = req.params;
    const userId = user.id || user._id;
    
    const todo = await Todo.findOne({_id: todoId, userId, isDeleted: false})
    if(!todo){
        throw new CustomError("there is no todo to toggle", 400);
    }
    
    todo.isCompleted = !todo.isCompleted;
    await todo.save()
    res.status(200).json({
        success: true,
        message: `Todo ${todo.isCompleted? "completed": "marked incomplete"}`,
        data: {id:todoId}
    })
})


export const getTodos = asyncHandler(async (req, res) =>{
    const {user} = req;
    const userId = user.id || user._id;
    const todo = await Todo.find({userId, isDeleted: false}).sort({createdAt: -1}).select("id name isCompleted");

    res.status(200).json({
        success:true,
        data: todo
    })
})

export const getATodo = asyncHandler(async (req, res) => {
    const {user} = req;
    const userId = user._id || user.id;
    const {id:todoId} = req.params;
    console.log("TodoOOD:",todoId)
    const todo = await Todo.findOne({_id: todoId, userId, isDeleted: false}).select("id name isCompleted")
    if(!todo){
        throw new CustomError("Todo not found by id", 404)
    }
    res.status(200).json({
        success: true,
        data: todo
    })
})