import { RequestHandler } from "express";
import userModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const getAuthUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await userModel
            .findById(req.session.userId)
            .select("+email")
            .exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};
interface SignUpRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export const registerUser: RequestHandler<
    unknown,
    unknown,
    SignUpRequest,
    unknown
> = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const rawPassword = req.body.password;

    try {
        if (!firstName || !lastName || !username || !email || !rawPassword) {
            throw createHttpError(400, "Missing required fields");
        }

        const existingEmailUser = await userModel
            .findOne({ email: email })
            .exec();
        if (existingEmailUser) {
            throw createHttpError(409, "Email already in use");
        }

        const existingUsernameUser = await userModel
            .findOne({ username: username })
            .exec();
        if (existingUsernameUser) {
            throw createHttpError(409, "Username already in use");
        }

        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const user = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        });

        req.session.userId = user._id;

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

interface LoginRequest {
    username: string;
    password: string;
}

export const loginUser: RequestHandler<
    unknown,
    unknown,
    LoginRequest,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Missing required fields");
        }

        const user = await userModel
            .findOne({ username: username })
            .select("+password +email")
            .exec();

        if (!user) {
            throw createHttpError(401, "Invalid username or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw createHttpError(401, "Invalid username or password");
        }

        req.session.userId = user._id;

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }
        res.sendStatus(200);
    });
};

// Not in use
export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user ID");
        }

        const user = await userModel.findById(userId);
        if (!user) {
            throw createHttpError(404, "User not found");
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user ID");
        }
        const user = await userModel.findByIdAndUpdate(userId, req.body, {
            new: true,
        });
        if (!user) {
            throw createHttpError(404, "User not found");
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid user ID");
        }
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            throw createHttpError(404, "User not found");
        }
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
