
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//home
const home = async (req , res) => {
    try {
        res.status(200).send("Welcome to the Login page");
    } catch (error) {
        console.log(error);
    }
}

//* -------------------
//* user Register logic
//* -------------------
const register = async (req , res) => {
    try {
        console.log(req.body);
        const { username,email,phone,password } = req.body;
        
         // Validation checks for name and email
        //  if (!username || !email) {
        //     return res.status(400).json({ msg: "Username and email are required" });
        // }
        //Password length check
        // if (!password || password.length < 8) {
        //     return res.status(400).json({ msg: "Password are required and should be at least 8 characters" });
        // }
        // Email format validation using a regular expression
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ msg: "Invalid email format" });
        // }

        const userExist = await  User.findOne({ email });
        if(userExist){
            return res.status(400).json({message:"email already exist"});
        }

            const userCreated = await User.create({
                username,
                email,
                phone,
                password,
            });
       
       res.status(201).json({
        msg:"User registered successfully",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } catch (error) {
        // console.error(error);
        res.status(500).json("internal server error");
    }
}


//* -------------------
//* user login logic
//* -------------------

const login = async(req, res) => {
    try {
        const { email ,password } = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        // const user = await bcrypt.compare(password,userExist.password);
           const user = await userExist.comparePassword(password); 
        if(user){
            res.status(200).json({
            msg:"User login successfully",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
            });
        }else{
            res.status(401).json({message:"Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json("internal server error");
    }
};

//* -------------------
//* to send user data - user logic
//* -------------------

const user = async (req,res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }

}

module.exports = { home, register, login, user };