import * as userController from "../controllers/userController";
import express from "express";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router
    .get("/", requiresAuth, userController.getAuthUser)
    .post("/register", userController.registerUser)
    .post("/login", userController.loginUser)
    .post("/logout", userController.logoutUser)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser);

export default router;
