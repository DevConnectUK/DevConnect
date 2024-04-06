import { Post } from "../../models/post";
import PostCard from "./PostCard";

interface PostGridProps {
    posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
    return (
        <div>
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
            ))}
        </div>
    );
}
