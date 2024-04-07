import { Post } from "../../../models/post";
import { formatDateTime } from "../../utilities";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 bg-primary">
            <h1 className="font-bold text-xl mb-2">{post.title}</h1>
            <p className=" text-base">{post.content}</p>
            <p className="text-xs">
                Created At: {formatDateTime(post.createdAt)}
            </p>
            <p className="text-xs">
                Updated At: {formatDateTime(post.updatedAt)}
            </p>
        </div>
    );
}
