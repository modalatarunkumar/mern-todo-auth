import CustomError from "../service/CustomError.js";
import asyncHandler from "../service/asyncHandler.js";
import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";


export const isLoggedIn = asyncHandler(async (req, res, next)=> {
    let token;
    
    if(req.cookies.token || req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }
    if(!token){
        throw new CustomError("Not authorized to access this resource", 401)

    }
    try {
        const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET)
        req.user = await User.findById(decodedJwtPayload._id, "name email role -createdAt -updatedAt -__v");
        next()
    } catch (error) {
        throw new CustomError(error.message || "Not Authorized to access this resource", error.code || 500)
    }
})