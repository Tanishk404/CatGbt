import { Router } from "express";
import {  DeleteChat, GetHome,  GetTitles,  HandelDefaultRoute, Login, RenameTitle, SignUp}  from "../controllers/home.js";
import { VerifyToken } from "../middleware/AuthMiddleware.js";

export const RoutesAll = Router()


RoutesAll.post("/user/signup", SignUp);
RoutesAll.post("/user/login", Login);
RoutesAll.get("/chat/:id", VerifyToken,  HandelDefaultRoute);
RoutesAll.get("/titles", VerifyToken, GetTitles);
RoutesAll.put("/titles/:id",VerifyToken, RenameTitle);
RoutesAll.delete("/chat/delete/:id", VerifyToken, DeleteChat);


RoutesAll.post("/",VerifyToken, GetHome);

