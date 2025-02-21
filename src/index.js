import { configDotenv } from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
 

configDotenv({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT||8000, () => {
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.error("ERROR",error);
    process.exit(1);
})



/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error", (error) => {
            console.error("ERROR",error); 
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR",error);
        throw error;
    }
})();*/