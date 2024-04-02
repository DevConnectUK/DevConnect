import { User, RegisterUserInput } from "../models/user";

async function handleRequest<T>(
    request: RequestInfo,
    init?: RequestInit
): Promise<T> {
    try {
        const response = await fetch(request, init);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error) {
        throw new Error(`Request failed: ${(error as Error).message}`);
    }
}

export async function getLoggedInUser(): Promise<User> {
    return await handleRequest<User>("/users");
}

export async function registerUser(user: RegisterUserInput): Promise<User> {
    return await handleRequest<User>("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

interface LoginRequest {
    username: string;
    password: string;
}

export async function loginUser(user: LoginRequest): Promise<User> {
    return await handleRequest<User>("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

export async function logoutUser(): Promise<void> {
    await fetch("/users/logout", { method: "POST" });
}

export async function updateUser(
    id: string,
    user: Partial<RegisterUserInput>
): Promise<User> {
    return await handleRequest<User>(`/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

export async function deleteUser(id: string): Promise<void> {
    await handleRequest<void>(`/users/${id}`, {
        method: "DELETE",
    });
}
