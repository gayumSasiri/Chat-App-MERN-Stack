import User from "../models/user.model.js";

export const signup = async (req,res) => {
    try{
        const {fullname,username,password,conformPassword,gender} = req.body;

        if(password !== conformPassword) {
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({username})
    } catch (error) {

    }
};

export const login = (req,res) => {
    console.log("login User");
};

export const logout = (req,res) => {
    console.log("logout User");
};