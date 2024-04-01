import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/users";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use((req, res, next) => {
    next(Error("Route not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An error occurred while processing your request.";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;
