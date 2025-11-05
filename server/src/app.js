import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
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