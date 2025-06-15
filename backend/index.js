import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import ChatbotRoute from "./routes/Chatbot.routes.js";
import ConnectDB from "./db/ConnectDB.db.js";
import AuthRoute from "./routes/Auth.routes.js";
import NewsRoute from "./routes/News.routes.js";
import HiremeRoute from "./routes/Hireme.routes.js";
import ProgressRoute from "./routes/Progress.routes.js";

dotenv.config();

//Database Connection
await ConnectDB();

const PORT = process.env.PORT || 3030;

const app = express();

//middlewares
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://authsecure-mu.vercel.app",
      "https://utsabadhikari.name.np",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

//Routing
app.get("/", (req, res) => {
  res.send("Hey there from backend");
});

app.use("/test", ChatbotRoute);
app.use("/auth", AuthRoute);
app.use("/news", NewsRoute);
app.use("/hireme", HiremeRoute)
app.use("/progress", ProgressRoute)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); 
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//listining

app.listen(PORT, () => {
  console.log(`The server is Running at PORT: ${PORT}`);
});
