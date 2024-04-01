import { RequestHandler } from "express";
import userModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const createUser: RequestHandler = async (req, res, next) => {
    try {
        if (!req.body.firstName) {
            throw createHttpError(400, "First name is required");
        }

        if (!req.body.lastName) {
            throw createHttpError(400, "Last name is required");
        }

        if (!req.body.username) {
            throw createHttpError(400, "Username is required");
        }

        if (!req.body.email) {
            throw createHttpError(400, "Email is required");
        }

        if (!req.body.password) {
            throw createHttpError(400, "Password is required");
        }

        const user = await userModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

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
