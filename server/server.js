// packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = 3000 || process.env.PORT;
const mongo_url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/mernAuth";
connectDB(mongo_url);

const app = express();

app.use(express.json({extends: true}));
app.use(cookieParser());

app.get("/", (req,res) =>{
    res.send("Welcome to the Advanced MERN Authentication System.")
});

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server start at port: ${port}`));