import { Link } from "react-router-dom";
import { Post } from "../../../models/post";
import PostCard from "./PostCard";

interface PostGridProps {
    posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                        <PostCard key={post._id} post={post} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
