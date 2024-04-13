import { Post } from "../../../models/post";
import { formatDate } from "../../utilities";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 bg-accent-500">
            <p className="text-base">{post.content}</p>
            <p className="text-xs">{formatDate(post.updatedAt)}</p>
        </div>
    );
}
