import {GoogleGenAI} from '@google/genai';
import { Conversationmodel } from '../models/ConversationSchema.js';
import { TitleModel } from '../models/TitleSchema.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { UserModel } from '../models/AuthSchema.js';
import jwt from 'jsonwebtoken'
import Bytez from 'bytez.js';
import configureCloudinary from '../config/cloudinary.js';




 
export const HandelDefaultRoute = async (req, res) => {
    try {
        const {id} = req.params;

     
        if(!id){
            return res.status(400).json({
                message: "Conversation Id missing"
            })
        }


        const data = await Conversationmodel.find({conversationId: id})
        .sort({_id: 1})

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Chat not found or deleted"
            });
        }

     

     
        res.status(200).json({
            convID: id,
            message: data,
            titles: res.locals.titles

        })
        
    } catch (error) {
        res.status(400).json({
            message: "Data not found in DB"
        })
        
    }
}




export const GetHome = async (req, res) => {
    const currentUser = req.userId;
    try {
        const {content, conversationId, role} = req.body;

    

        // const file = req.files;

        // console.log(file)

    let chatTitle = null;  
  
if(!content){
        return res.status(400).json({
            message: "data not get"
        })
    }

    let convId = conversationId;

    if(!convId){
const key = process.env.BYTEZ_KEY
const sdk = new Bytez(key)
const model = sdk.model("openai/gpt-4o-mini")
const { error, output } = await model.run([
  {
    "role": "user",
    "content": `Create a short chat title (max 5 words) from this message:\n${content}\nOnly return the title without quotes.`
  }
])
    console.log(output)
        const newconversationalId = await TitleModel.create({
            userId: req.userId,
            title: output ? output.content.substring(0, 30) : 'new chat'
        })

        convId = newconversationalId._id;
    };



    await Conversationmodel.create({
        conversationId: convId,
        role: role,
        content: content
    })


    // const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
 
    //   const response = await ai.models.generateContent({
    //     model: 'gemini-2.5-flash',
    //     contents: {
    //         chattitle: 'create a short title for ai and user chat',
    //         content,

    //     },
    //   });
    //   const AiResponse = response.text;





const key = process.env.BYTEZ_KEY
const sdk = new Bytez(key)

// choose gpt-4o-mini
const model = sdk.model("openai/gpt-4o-mini")

// send input to model
const { error, output } = await model.run([
  {
    "role": "user",
    "content": content
  }
])





      await Conversationmodel.create({
          conversationId: convId,
          role: 'assistant',
          content: output.content
      })

    const AiResponse = output.content

    res.status(200).json({
        data: AiResponse,
        message: "Get From Backend",
        conversationId : convId
    })

 
        
    } catch (error) {
        console.log(error.message)
 
        res.status(400).json({
            message: 'Today request quota exceed',
            
        })

       
    }

}



export const GetTitles = async (req, res) => {
    const userID = req.userId 
    console.log(userID)
    try {
        const titles = await TitleModel.find().find({ userId: req.userId }).sort({createdAt: -1})

        const User = await UserModel.find({_id: userID})

        res.status(200).json({
        titles: titles,
        User
        })

    } catch (error) {
        console.log("Error while getting titles : ",error.message)

        res.status(400).json({
        error: error.message
        })
    }

}





export const RenameTitle = async (req, res) => {
    const currentUser = req.userId


    try {
        const {id} = (req.params)
        const {title} = req.body


      if(!currentUser) return null;

        await TitleModel.findByIdAndUpdate(id, {title})
        
        res.status(200).json({
            message: "Title renamed successfully"
        })

        
    } catch (error) {
        res.status(400).json({
            message: "renamed failed",
            error: error.message
        })
        
    }
}

export const DeleteChat = async (req, res) => {
        const currentUser = req.userId

    
    try {
        const {id} = (req.params)

        if(!currentUser) return null
      
        await TitleModel.findByIdAndDelete(id)
        const conv =  await Conversationmodel.deleteMany({conversationId: id})
        
       
        
        res.status(200).json({
            message: "Chat deleted successfully"
        })

        
    } catch (error) {
        res.status(400).json({
            message: "Delete chat failed",
            error: error.message
        })
        
    }
}










export const SignUp = async (req, res) => {
    try {
        const {fullname, emailid, password} = req.body

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
    const {emailid, password} = req.body
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
        console.log("UserLogin Sucess", findUser.email)

        res.status(200).json({
            message: 'Login successfully',
            token
        })
     
    }
        
    catch (error) {
        console.log(error.message)
    }
}








export const GetUserDashboard = async (req, res) => {
    try {
        const userId = req.userId
        const user = await UserModel.findById(userId)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({
            message: 'Failed to get user data'
        })
        console.log(error)
    }
}



export const UserDashBoard = async (req, res) => {
    try {
        const { updatedname } = req.body
        const userId = req.userId;
        let imageUrl = null;

        if(req.file){
            const cloudinary = configureCloudinary()
            const filepath = req.file.path
            const result = await cloudinary.uploader.upload(filepath, {
                folder: 'avatars'
            })

            imageUrl = result.secure_url;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            ...(updatedname && {username: updatedname}),
            ...(imageUrl && {avatar: imageUrl}),
            
        },
        {new: true}
    )

    res.status(200).json({
            message: 'data saved successfully',
            user: updatedUser   
        })

        
    } catch (error) {
        res.status(400).json({
            message: 'Failed to save data'

        })

        console.log(error.message)
    }

}



