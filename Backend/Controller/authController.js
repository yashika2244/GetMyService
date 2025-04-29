import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import UserModels from '../Models/UserModels.js';
import ServiceProviderModel from '../Models/ServiceProviderModel.js';

//  generated token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)

}

// /register
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        // Valid Input

        if (!email || !password || !name || !role || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (role !== "customer" && role !== "service-provider") {
            return res.status(400).json({ message: "Invalid role" });
        }
        // Check if user already exists
        let user = await UserModels.findOne({ email })
        if (user) {

            return res.status(400).json({ message: "User already exists" });

        }
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user or doctor based on role
        const Model = role === "customer" ? UserModels : service - provider;
        const newUser = new Model({
            name,
            email,
            password: hashPassword,
            photo,
            gender,
            role,

        })
        // Save user
        await newUser.save();
        res.status(201).json({ success: true, message: "User successfully created" });



    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });

    }




}

// / login

export const login = async (req, res) => {
    let { email } = req.body;
    try {
        let user = null
        const costomer = await UserModels.findOne({ email });
        const ServiceProvider = await ServiceProviderModel.findOne({ email });
        if (req.body.role === "customer") {
            user = costomer
        }
        else if (req.body.role === "service-provider") {
            user = ServiceProvider
        }

        if (!user) {
            return res.status(404).json({ message: "User Not found" })
        }
        // if user exist then check password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "wrong password" })
        }
        //get token--

        const token = generateToken(user);
        const { password, role, ...rest } = user._doc

        return res.status(200).cookie("token", token).json({ status: true, message: "sucessfully", token, data: { ...rest }, role })





    } catch (error) {
        return res.status(500).json({ status: false, message: "login failed" })

    }

}


