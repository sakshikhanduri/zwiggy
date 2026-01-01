import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'
//Login user
const login = async (req, res) => {
const {email,password} = req.body;
try {
    const user = await User.findOne({email})
    if(!user){
        return res.json({success:false,message:'User does not exists!'})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.json({ success: false, message: 'Invalid credentials' })
    }
    const token = createToken(user._id);
    res.json({success:true,token})
} catch (error) {
    res.json({success:false,message:"Error"})
}
}
 //create token
 const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
 }

//Register user
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //checking if user is already registered
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists!' })
        }
        //validating email format and strong format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter valid email' });
        }
        if(password.length<8){
            return res.json({success:false,message:'Please provide strong password'})
        }
        //hasing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
       const newUser = new User({
        name:name,email:email,password:hashedPassword
       })

       const user = await newUser.save();
       const token  = createToken(user._id);
       res.json({success:true,token})
    } catch (error) {
res.json({success:false,message:"Error"})
    }
}

export { login, register }