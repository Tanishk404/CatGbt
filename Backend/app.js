import express from "express";
import { RoutesAll } from "./routes/route.js";
import cors from 'cors'
import dotenv from 'dotenv'
import { DataBaseConnection } from "./config/DBConnection.js";


dotenv.config()
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