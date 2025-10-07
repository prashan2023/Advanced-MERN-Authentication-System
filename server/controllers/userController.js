import User from "../model/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";

const createUser = asyncHandler(async(req,res) =>{
    const {username,email,password} = req.body;
    
    if(!username || !email || !password){
        res.status(400).send("Please fill the all the inputs.")
    };

    const existingUser = await User.findOne({email});

    if(existingUser){
        res.status(401);
        throw new Error("User Already exist.")
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const newUser = new User({username,email,password:hashedPassword});

    try {
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
       res.status(401);
       throw new Error("Invalid User credentials.") 
    }
});

export {createUser}