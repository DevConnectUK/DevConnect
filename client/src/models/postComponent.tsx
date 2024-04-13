import { User } from "./user";

export type PostComponent = {
    _id: string;
    content: string;
    author: User;
    likes: User[];
    replies: Comment[];
    createdAt: string;
    updatedAt: string;
};
