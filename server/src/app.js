import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import config from "./config/index.js";

const app = express()

const allowedOrigins = [
    "http://localhost:3000",
    config.FRONTEND_URL
]
app.use(cors({
    origin: function (origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())


app.get("/", (_req, res)=> {
    res.status(200).json({
        success: true,
        message:"Hello welcome to kumar api"
    })
})

app.use("/api/v1", routes)

app.use((_req,res)=> {
    res.status(400).json({
        success:false,
        message: "route not found"
    })
})

app.use(errorHandler);
export default app;