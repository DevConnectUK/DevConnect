import { RequestHandler } from "express";
import Comment from "../models/comment"; // Assuming the path to your Comment model
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CreateCommentRequest {
    content: string;
    author: string;
    post: string;
    parentComment?: string | null;
}

export const createComment: RequestHandler<
    unknown,
    unknown,
    CreateCommentRequest,
    unknown
> = async (req, res, next) => {
    const { content, author, post, parentComment } = req.body;

    try {
        if (!content || !author || !post) {
            throw createHttpError(400, "Missing required fields");
        }

        const newComment = await Comment.create({
            content,
            author,
            post,
            parentComment,
        });

        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

export const getCommentsByPostId: RequestHandler = async (req, res, next) => {
    const postId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(postId)) {
            throw createHttpError(400, "Invalid post ID");
        }

        const comments = await Comment.find({ post: postId });
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

export const getCommentById: RequestHandler = async (req, res, next) => {
    const commentId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(commentId)) {
            throw createHttpError(400, "Invalid comment ID");
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw createHttpError(404, "Comment not found");
        }

        res.json(comment);
    } catch (error) {
        next(error);
    }
};

export const updateComment: RequestHandler = async (req, res, next) => {
    const commentId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(commentId)) {
            throw createHttpError(400, "Invalid comment ID");
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            req.body,
            {
                new: true,
            }
        );

        if (!updatedComment) {
            throw createHttpError(404, "Comment not found");
        }

        res.json(updatedComment);
    } catch (error) {
        next(error);
    }
};

export const deleteComment: RequestHandler = async (req, res, next) => {
    const commentId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(commentId)) {
            throw createHttpError(400, "Invalid comment ID");
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            throw createHttpError(404, "Comment not found");
        }

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
