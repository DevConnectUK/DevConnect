import { apiClient } from "./apiClient";
import { PostInput, Post } from "@/types/post";

export async function createPost(postData: PostInput) {
    return apiClient.post<Post>("/posts", postData);
}

export async function getUserPosts(userId: string) {
    return apiClient.get<Post[]>(`/posts/user/${userId}`);
}

export async function getPostById(postId: string) {
    return apiClient.get<Post>(`/posts/${postId}`);
}

export async function updatePostById(postId: string, postData: PostInput) {
    return apiClient.put<Post>(`/posts/${postId}`, postData);
}

export async function deletePost(postId: string) {
    return apiClient.delete(`/posts/${postId}`);
}
