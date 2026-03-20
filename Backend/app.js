import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { RoutesAll } from "./routes/route.js";
import cors from 'cors'
import { DataBaseConnection } from "./config/DBConnection.js";
import cookieParser from 'cookie-parser';



const app = express();
const PORT = 3000;

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(RoutesAll);



app.listen(PORT, () => {
    console.log("app is running on ", `http://localhost:${PORT}`)
    DataBaseConnection()
})