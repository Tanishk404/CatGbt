import { GoogleGenAI } from "@google/genai";
import { Conversationmodel } from "../models/ConversationSchema.js";
import { TitleModel } from "../models/TitleSchema.js";
import { UserModel } from "../models/AuthSchema.js";
import Bytez from "bytez.js";
import cloudinary from "../config/cloudinary.js";
import {OpenAI} from 'openai'

export const HandelDefaultRoute = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Conversation Id missing",
      });
    }
    const data = await Conversationmodel.find({ conversationId: id }).sort({
      _id: 1,
    });

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Chat not found or deleted",
      });
    }

    res.status(200).json({
      convID: id,
      message: data,
      titles: res.locals.titles,
    });
  } catch (error) {
    res.status(400).json({
      message: "Data not found in DB",
    });
  }
};









export const GetHome = async (req, res) => {
  const currentUser = req.userId;
  try {
    const { content, conversationId, role } = req.body;
    // const file = req.files;
    let AiResponse = "Sorry, I couldn't process that."
    // console.log(file)
    let chatTitle = null;

    if (!content) {
      return res.status(400).json({
        message: "data not get",
      });
    }


    // const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    //   const response = await ai.models.generateContent({
    //     model: 'gemini-2.5-flash',
    //     contents: content,

      
    //   });
    //   const AiResponse = response.text;


    
    const openRouterClient = new OpenAI({
      baseURL: process.env.BASE_URL, 
      apiKey: process.env.OPENROUTER_API_KEY,  
    });
    
    try {
      const completion = await openRouterClient.chat.completions.create({
        model: 'google/gemini-2.5-flash',
        max_tokens: 1000,                
        messages: [
          {
            role: 'user',
            content: content,
          },
        ],
      });
      
      AiResponse = completion.choices[0].message.content;
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error("OpenRouter Error:", error.message);
    }
    

     


    let convId = conversationId;

    // const key = process.env.BYTEZ_KEY;
    // const sdk = new Bytez(key);

    // // choose gpt-4o-mini
    // const model = sdk.model("mistralai/Mistral-7B-Instruct-v0.3");

    // // send input to model
    // const { error, output } = await model.run([
    //   {
    //     role: "user",
    //     content: content,
    //   },
    // ]);

    // console.log("Model Output:", output, "Model Error:", error);

  //   if(!output || !output.content){ 
  //     return res.status(404).json({
  //     message: 'Today request quota exceed'
  //   })
  // }

    if (!convId) {
      // const key = process.env.BYTEZ_KEY;
      // const sdk = new Bytez(key);
      // const model = sdk.model("mistralai/Mistral-7B-Instruct-v0.3");
      // const { error, output } = await model.run([
      //   {
      //     role: "user",
      //     content: `Create a short chat title (max 5 words) from this message:\n${content}\nOnly return the title without quotes.`,
      //   },
      // ]);
      // console.log(output);

          const openRouterClient = new OpenAI({
      baseURL: process.env.BASE_URL, 
      apiKey: process.env.OPENROUTER_API_KEY,  
    });

    let title = 'new chat'

    try {
      const completion = await openRouterClient.chat.completions.create({
        model: 'google/gemini-2.5-flash',
        max_tokens: 1000,                
        messages: [
          {
            role: 'user',
            content: `Create a short chat title (max 5 words) from this message:\n${content}\nOnly return the title without quotes.`,
          },
        ],
      });
      
      title = completion.choices[0].message.content;
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error("OpenRouter Error:", error.message);
    }

      
      const newconversationalId = await TitleModel.create({
        userId: req.userId,
        title: title || content.substring(0,30),
      });

      convId = newconversationalId._id;

    }
  

    await Conversationmodel.create({
      conversationId: convId,
      role: role || 'user',
      content: content,
    });



    // const AiResponse = output.content;

    await Conversationmodel.create({
      conversationId: convId,
      role: "assistant",
      content: AiResponse,
    });


    return res.status(200).json({
      data: AiResponse,
      message: "Get From Backend",
      conversationId: convId,
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "An error occurred w+hile processing your request",
    });
  }



};



export const GetTitles = async (req, res) => {
  const userID = req.userId;
  console.log(userID);
  try {
    const titles = await TitleModel.find()
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    const User = await UserModel.find({ _id: userID });

    res.status(200).json({
      titles: titles,
      User,
    });
  } catch (error) {
    console.log("Error while getting titles : ", error.message);

    res.status(400).json({
      error: error.message,
    });
  }
};

export const RenameTitle = async (req, res) => {
  const currentUser = req.userId;

  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!currentUser) return null;

    await TitleModel.findByIdAndUpdate(id, { title });

    res.status(200).json({
      message: "Title renamed successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "renamed failed",
      error: error.message,
    });
  }
};

export const DeleteChat = async (req, res) => {
  const currentUser = req.userId;

  try {
    const { id } = req.params;

    if (!currentUser) return null;

    await TitleModel.findByIdAndDelete(id);
    const conv = await Conversationmodel.deleteMany({ conversationId: id });

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Delete chat failed",
      error: error.message,
    });
  }
};
