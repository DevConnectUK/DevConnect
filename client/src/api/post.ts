import { handleRequest } from "./utilities";
import { CreatePostInput, Post, UpdatePostInput } from "#types/post";

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

export async function updatePostById(
    postId: string,
    postData: UpdatePostInput
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
