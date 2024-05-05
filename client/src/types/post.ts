import { z } from "zod";
import { PostComponent } from "./postComponent";

export type Post = PostComponent;

export const postSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
});

export type PostInput = z.infer<typeof postSchema>;
