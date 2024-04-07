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
    return await handleRequest<void>("/api/users/logout", {
        method: "POST",
    });
}

export async function updateUser(
    user: Partial<RegisterUserInput>
): Promise<User> {
    return await handleRequest<User>("/api/users/", {
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
