import { PostComponent } from "./postComponent";

export type Post = PostComponent;

export type CreatePostInput = {
    content: string;
};

export type UpdatePostInput = {
    content: string;
};
