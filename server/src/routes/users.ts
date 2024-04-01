import * as userController from "../controllers/userController";
import express from "express";

const router = express.Router();

router
    .post("/", userController.createUser)
    .get("/", userController.getUsers)
    .get("/:id", userController.getUser)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser);

export default router;
