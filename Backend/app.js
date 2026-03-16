import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { RoutesAll } from "./routes/route.js";
import cors from 'cors'
import { DataBaseConnection } from "./config/DBConnection.js";



const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(RoutesAll);



app.listen(PORT, () => {
    console.log("app is running on ", `http://localhost:${PORT}`)
    DataBaseConnection()
})