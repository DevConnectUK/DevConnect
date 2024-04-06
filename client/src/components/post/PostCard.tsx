import { Post } from "../../models/post";

interface PostCardProps {
    post: Post;
}
export default function PostCard({ post }: PostCardProps) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Created At: {post.createdAt}</p>
            <p>Updated At: {post.updatedAt}</p>
        </div>
    );
}
