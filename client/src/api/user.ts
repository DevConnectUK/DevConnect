import { User, RegisterUserInput, LoginUserInput } from "@/types/user";
import { handleRequest } from "./utilities";
import { apiClient } from "./apiClient";

export async function getLoggedInUser() {
    return await handleRequest<User>("/users");
}

export async function registerUser(user: RegisterUserInput) {
    return apiClient.post<User>("/users", user);
}

export async function loginUser(user: LoginUserInput) {
    return apiClient.post<User>("/users/login", user);
}

export async function logoutUser() {
    return apiClient.post<void>("/users/logout");
}

export async function updateUser(user: Partial<RegisterUserInput>) {
    return apiClient.put<User>("/users", user);
}

export async function deleteUser(userId: string) {
    return apiClient.delete(`/users/${userId}`);
}
