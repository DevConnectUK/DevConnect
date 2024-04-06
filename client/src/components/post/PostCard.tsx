import { Post } from "../../models/post";
import { formatDate } from "../utilities";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 bg-primary">
            <h1 className="font-bold text-xl mb-2">{post.title}</h1>
            <p className=" text-base">{post.content}</p>
            <p className="text-xs">Author: {post.author}</p>
            <p className="text-xs">Created At: {formatDate(post.createdAt)}</p>
            <p className="text-xs">Updated At: {formatDate(post.updatedAt)}</p>
        </div>
    );
}
