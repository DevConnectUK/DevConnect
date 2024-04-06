import { User, RegisterUserInput, LoginUserInput } from "../models/user";
import { handleRequest } from "./utilities";

export async function getLoggedInUser(): Promise<User> {
    return await handleRequest<User>("/api/users");
}

export async function registerUser(user: RegisterUserInput): Promise<User> {
    return await handleRequest<User>("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

export async function loginUser(user: LoginUserInput): Promise<User> {
    return await handleRequest<User>("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

export async function logoutUser(): Promise<void> {
    await fetch("/api/users/logout", { method: "POST" });
}

export async function updateUser(
    id: string,
    user: Partial<RegisterUserInput>
): Promise<User> {
    return await handleRequest<User>(`/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

export async function deleteUser(id: string): Promise<void> {
    await handleRequest<void>(`/api/users/${id}`, {
        method: "DELETE",
    });
}
