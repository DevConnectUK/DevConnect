export type Post = {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
};

export type CreatePostInput = {
    title: string;
    content: string;
};
