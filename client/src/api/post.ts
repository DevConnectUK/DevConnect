import { handleRequest } from "./utilities";
import { Post } from "../models/post";

interface CreatePostInput {
    title: string;
    content: string;
}

export async function createPost(postData: CreatePostInput): Promise<Post> {
    return await handleRequest<Post>("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
}

export async function getUserPosts(userId: string): Promise<Post[]> {
    return await handleRequest<Post[]>(`/api/posts/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function getPostById(postId: string): Promise<Post> {
    return await handleRequest<Post>(`/api/posts/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function updatePost(
    postId: string,
    postData: Partial<CreatePostInput>
): Promise<Post> {
    return await handleRequest<Post>(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
}

export async function deletePost(postId: string): Promise<void> {
    await handleRequest<void>(`/api/posts/${postId}`, {
        method: "DELETE",
    });
}
