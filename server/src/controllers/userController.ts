import { RequestHandler } from "express";
import userModel from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
    try {
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
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};
