import { Link } from "react-router-dom";
import { Post } from "../../../models/post";
import PostCard from "./PostCard";

interface PostGridProps {
    posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                        <PostCard key={post._id} post={post} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
