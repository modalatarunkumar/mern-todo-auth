import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../service/CustomError.js";
import User from "../models/user.schema.js";
import mailHelper from "../utils/mailHelper.js";
import crypto from "crypto";

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @returns User Object
 ******************************************************/

export const signUp = asyncHandler(async (req, res) => {
    // get data from user
    const { name, email, password } = req.body;

    // validation
    if(!name || !email || !password){
        throw new CustomError("Please fill all fields", 400)
    }
    
    // check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new CustomError("User already exists", 400)
    }
    
    // lets add this data to database
    const user = await User.create({name, email, password});
    
    const token = await user.getJWTtoken()    

    // safety
    user.password = undefined

    // store this token in user's cookie
    res.cookie("token", token, cookieOptions);

    // send back a response to user
    res.status(200).json({
        success: true,
        message:"User created successfully",
        token,
        user
    })
})

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/login
 * @description User login Controller for user to login by generating token
 * @returns User Object
 ******************************************************/

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // validation
    if(!email || !password){
        throw new CustomError("Please fill all fields to login", 400);
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new CustomError("Invalid Credentials", 400);
    }

    const isPasswordMathched = await user.comparePassword(password);
    
    if(isPasswordMathched){
        const token = await user.getJWTtoken()
        user.password = undefined
        res.cookie("token", token, cookieOptions)
        return res.status(200).json({
            success: true,
            message: "login successfully",
            token,
            user
        })
    }

    throw new CustomError("Password is Incorrect", 400)
})


/******************************************************
 * @LOGOUT
 * @route http://localhost:5000/api/auth/logout
 * @description User logout Controller for logout a user
 * @access PRIVATE
 * @returns {object} 200 - {success:true, message: "Logged out successfully"}
 ******************************************************/


export const logout = asyncHandler((_req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})


/******************************************************
 * @GETPROFILE
 * @route http://localhost:5000/api/auth/profile
 * @description User getProfile Controller for details of user
 * @access PRIVATE
 * @returns User Object
 ******************************************************/

export const getProfile = asyncHandler(async (req, res) => {
    const {user} = req;

    if(!user){
        throw new CustomError("User not found", 401);
    }
    res.status(200).json({
        success:true,
        message: "User found",
        user
    })
})

/******************************************************
 * @FORGOTPASSWORD
 * @route http://localhost:5000/api/auth/password/forgot
 * @description User forgotPassword Controller to send token in email to user
 * @returns User Object
 ******************************************************/

export const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;
    
    if(!email){
        throw new CustomError("Please Enter email", 400);
    }
    
    const user = await User.findOne({email});
    
    if(!user){
        throw new CustomError("User not found", 404);
    }

    const resetToken = user.generateForgotPasswordToken();
    
    await user.save({validateBeforeSave: false});

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows \n\n ${resetUrl} \n\n if this was not requested by you, please ignore.`

    try {
        await mailHelper({
            email: user.email,
            subject: "Password Reset Mail",
            message
        })
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save({validateBeforeSave: false});

        throw new CustomError(error.message || "Email could not be sent", 500);
    }
    res.status(200).json({
        success: true,
        message: "reset successful"
    })
})

/******************************************************
 * @RESETPASSWORD
 * @route http://localhost:5000/api/auth/password/reset
 * @description User getProfile Controller for details of user
 * @access PRIVATE
 * @returns User Object
 ******************************************************/

export const resetPassword = asyncHandler(async (req, res) => {
    const {token: resetToken} = req.params;
    const {password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        throw new CustomError("Password and confirm password should match", 400);
    }

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    const user = await User.findOne({
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    })

    if(!user){
        throw new CustomError("Password reset token is invalid or expired", 400);
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save()

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    })
})