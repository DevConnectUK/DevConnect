import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", userRouter);

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
