import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/AuthSchema.js'
import { LoginValidation, UserValidation } from '../validators/user.validator.js'



export const SignUp = async (req, res) => {
    try {
        const result = UserValidation.safeParse(req.body)

        const {fullname, emailid, password} = result.data

       const hashPassword = await bcrypt.hash(password, 10)

       const User = await UserModel.findOne({email: emailid})

        if(User) {
            return res.status(409).json({
                message: 'this email is already registered'
            })
        }
        const CreatUser = await UserModel.create({
            username: fullname,
            email: emailid,
            password: hashPassword
        })
 
        res.status(200).json({
            message: "User signup successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        console.log(error)
    }
}



export const Login = async (req, res) => {
    const result = LoginValidation.safeParse(req.body)
    console.log(result)
    const {emailid, password} = result.data
    try {

        const findUser = await UserModel.findOne({email:emailid}).select('+password')

        if(!findUser){
            console.log('Email id is not regisetred 🔴')
           return res.status(404).json({
            message: 'This emailid is not regesetred'
        })
        }

        const isMatch = await bcrypt.compare(password, findUser.password)
        if(!isMatch){
            console.log('Invalid credentials 🔴')
            return res.status(404).json({
                message: 'Invalid password'
            }
        )
        }

        const token = jwt.sign(
            {id: findUser._id},
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
       

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: 'Login successfully'
        })
     
    }
        
    catch (error) {
        console.log(error.message)
    }
}





export const LogOut = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Logged out sucessfully"
    })
}