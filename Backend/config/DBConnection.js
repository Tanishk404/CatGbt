import mongoose from 'mongoose';

export const DataBaseConnection = async () => {
   try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    console.log("Data Base connection successfully 🟢")
    
   } catch (error) {
    console.log("Data Base connection faild 🔴", error.message)
   }
}

