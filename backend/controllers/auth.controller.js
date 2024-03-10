import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req,res) => {
    try{
        const {fullname,username,password,conformPassword,gender} = req.body;

        if(password !== conformPassword) {
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error:"Username already exists"});
        }

        //Hash password here
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User ({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            //generate JWT token here
            
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic : newUser.profilePic
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signUp", error.message);
        res.status(500).json({error: "Internl server Error"});
    }
};

export const login = (req,res) => {
    console.log("login User");
};

export const logout = (req,res) => {
    console.log("logout User");
};