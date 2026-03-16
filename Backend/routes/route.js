import { Router } from "express";
import {  DeleteChat, GetHome,  GetTitles,  GetUserDashboard,  HandelDefaultRoute, Login, RenameTitle, SignUp, UserDashBoard}  from "../controllers/home.js";
import { VerifyToken } from "../middleware/AuthMiddleware.js";
import { upload } from '../middleware/multer.js'
export const RoutesAll = Router()


RoutesAll.post("/user/signup", SignUp);
RoutesAll.post("/user/login", Login);

RoutesAll.get("/chat/:id", VerifyToken,  HandelDefaultRoute);
RoutesAll.get("/titles", VerifyToken, GetTitles);
RoutesAll.put("/titles/:id",VerifyToken, RenameTitle);
RoutesAll.delete("/chat/delete/:id", VerifyToken, DeleteChat);


RoutesAll.post("/user/dashboard",VerifyToken, upload.single("image"), UserDashBoard);

RoutesAll.get("/user/dashboard",VerifyToken,  GetUserDashboard);

RoutesAll.post("/",VerifyToken, GetHome);

