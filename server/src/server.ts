import app from "./app";
import cleanEnv from "./util/validateEnv";
import mongoose from "mongoose";

const port = cleanEnv.PORT || 5000;

mongoose
    .connect(cleanEnv.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(console.error);
