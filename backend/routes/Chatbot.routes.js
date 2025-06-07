import express from "express";
import { Chatbot } from "../controllers/Chatbot.controllers.js";

const ChatbotRoute = express.Router();

ChatbotRoute.post("/chatbot", Chatbot);

export default ChatbotRoute;