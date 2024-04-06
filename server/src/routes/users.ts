import express from "express";
import * as userController from "../controllers/userController";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router
    .get("/", requiresAuth, userController.getAuthUser)
    .post("/register", userController.registerUser)
    .post("/login", userController.loginUser)
    .post("/logout", userController.logoutUser)
    .put("/", requiresAuth, userController.updateUser)
    .delete("/", requiresAuth, userController.deleteUser);

export default router;
