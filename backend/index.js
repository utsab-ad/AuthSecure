import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import ChatbotRoute from "./routes/Chatbot.routes.js"
import ConnectDB from "./db/ConnectDB.db.js"

dotenv.config();

//Database Connection
await ConnectDB();

const PORT = process.env.PORT || 3030;

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [process.env.FRONTEND_URL, "https://authsecure-mu.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());



//Routing
app.get("/", (req, res) => {
    res.send("Hey there from backend");
});

app.use("/test", ChatbotRoute);

//listining

app.listen(PORT, () => {
    console.log(`The server is Running at PORT: ${PORT}`);
});

