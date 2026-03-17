import {GoogleGenAI} from '@google/genai';
import { Conversationmodel } from '../models/ConversationSchema.js';
import { TitleModel } from '../models/TitleSchema.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { UserModel } from '../models/AuthSchema.js';
import jwt from 'jsonwebtoken'
import Bytez from 'bytez.js';
import cloudinary from '../config/cloudinary.js';




 
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
        const { updatedname } = req.body;
        const userId = req.userId;
        
        console.log('📥 UserDashBoard Request:');
        console.log('  - userId:', userId);
        console.log('  - updatedname:', updatedname);
        console.log('  - hasFile:', !!req.file);

        if (!userId) {
            return res.status(401).json({
                message: 'User not authenticated'
            });
        }

        let imageUrl = null;

        // ✅ FIX: Use req.file.buffer instead of req.file.path
        if(req.file) {
            try {
                console.log('📤 Uploading to Cloudinary...');
                
                const uploadFromBuffer = (buffer) => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { 
                                folder: 'avatars',
                                resource_type: 'auto',
                                quality: 'auto'
                            },
                            (error, result) => {
                                if(error) {
                                    console.error('❌ Upload error:', error);
                                    reject(error);
                                } else {
                                    console.log('✅ Upload successful:', result.secure_url);
                                    resolve(result);
                                }
                            }
                        );
                        stream.end(buffer);  // ✅ Use buffer instead of filepath
                    });
                };

                const result = await uploadFromBuffer(req.file.buffer);
                imageUrl = result.secure_url;
                
            } catch (uploadError) {
                console.error('❌ Cloudinary upload failed:', uploadError.message);
                return res.status(400).json({
                    message: 'Image upload failed',
                    error: uploadError.message
                });
            }
        }

        const updateData = {};
        
        if (updatedname && updatedname.trim()) {
            updateData.username = updatedname.trim();
        }
        
        if (imageUrl) {
            updateData.avatar = imageUrl;
        }

        // ✅ Validation: Check if there's data to update
        if (Object.keys(updateData).length === 0) {
            console.warn('⚠️ No data to update');
            return res.status(400).json({
                message: 'No data to update - provide name or image'
            });
        }

        console.log('📝 Updating user with:', updateData);

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.error('❌ User not found:', userId);
            return res.status(404).json({
                message: 'User not found'
            });
        }

        console.log('✅ User updated successfully');
        res.status(200).json({
            message: 'Data saved successfully',
            user: updatedUser   
        });

    } catch (error) {
        console.error('❌ UserDashBoard Error:', error.message);
        res.status(500).json({
            message: 'Failed to save data',
            error: error.message
        });
    }
};