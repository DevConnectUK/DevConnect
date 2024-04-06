import { RequestHandler } from "express";
import Post from "../models/post";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CreatePostRequest {
    title: string;
    content: string;
}

export const createPost: RequestHandler<
    unknown,
    unknown,
    CreatePostRequest,
    unknown
> = async (req, res, next) => {
    const { title, content } = req.body;
    const author = req.session.userId;

    try {
        if (!title || !content || !author) {
            throw createHttpError(400, "Missing required fields");
        }

        const newPost = await Post.create({
            title,
            content,
            author,
        });

        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

export const getUserPosts: RequestHandler = async (req, res, next) => {
    console.log(req.body);
    const userId = req.body.userId;
    try {
        if (!userId) {
            throw createHttpError(401, "Unauthorized");
        }

        const posts = await Post.find({ author: userId });
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

export const getPostById: RequestHandler = async (req, res, next) => {
    const postId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(postId)) {
            throw createHttpError(400, "Invalid post ID");
        }

        const post = await Post.findById(postId);
        if (!post) {
            throw createHttpError(404, "Post not found");
        }

        res.json(post);
    } catch (error) {
        next(error);
    }
};

export const updatePost: RequestHandler = async (req, res, next) => {
    const postId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(postId)) {
            throw createHttpError(400, "Invalid post ID");
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
            new: true,
        });

        if (!updatedPost) {
            throw createHttpError(404, "Post not found");
        }

        res.json(updatedPost);
    } catch (error) {
        next(error);
    }
};

export const deletePost: RequestHandler = async (req, res, next) => {
    const postId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(postId)) {
            throw createHttpError(400, "Invalid post ID");
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            throw createHttpError(404, "Post not found");
        }

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
