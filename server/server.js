import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

(async () => {
    try {
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
        await mongoose.connect(config.MONGODB_URI);
        mongoose.connection.on("disconnected", () => console.log("MONGODB disconnected"))
        mongoose.connection.on("error", (err) => console.log("Error: ", err))
        console.log("DB connected succesfully")

        app.on("error", (error) => {
            console.error("Error on connecting app with DB: ", error)
        })

        app.listen(config.PORT, () => {
            console.log(`Listening on port ${config.PORT}`)
        })
    } catch (error) {
        console.error("Error Connecting DB: ", error)
    }
    finally{
        
        // await mongoose.disconnect()
    }
})()
