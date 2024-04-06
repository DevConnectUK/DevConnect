import express from "express";
import * as commentController from "../controllers/commentController";

const router = express.Router();

router
    .post("/", commentController.createComment)
    .get("/post/:id", commentController.getCommentsByPostId)
    .get("/:id", commentController.getCommentById)
    .put("/:id", commentController.updateComment)
    .delete("/:id", commentController.deleteComment);

export default router;
