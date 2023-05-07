import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./configs/database.config";
import { hospitalsRouter } from "./routes/hospital.route";
import { petsRouter } from "./routes/pet.route";


dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

connectToDatabase()
    .then(() => {
        app.use("/hospitals", hospitalsRouter);
        app.use("/pets", petsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });