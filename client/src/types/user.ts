import { z } from "zod";

export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

export type RegisterUserInput = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export type LoginUserInput = {
    username: string;
    password: string;
};

export type UpdateUserInput = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
};

export const userProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

export const userLoginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;
