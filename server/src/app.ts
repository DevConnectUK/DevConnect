import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/users";
import postRouter from "./routes/posts";
import commentRouter from "./routes/comments";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import validateEnv from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
    session({
        secret: validateEnv.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3 * 60 * 60 * 1000,
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: validateEnv.MONGO_URI,
        }),
    })
);

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use((req, res, next) => {
    next(createHttpError(404, "Route not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An error occurred while processing your request.";
    let statusCode = 500;
    if (isHttpError(error)) {
        errorMessage = error.message;
        statusCode = error.status;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;
