import { useEffect, useState } from "react";

import { getUserPosts } from "@/api/post";
import PostGrid from "@/components/common/post/PostGrid";
import { Post } from "@/types/post";
import { useUserContext } from "@/contexts/UserContext";

export default function UserPostsPage() {
    const [user] = useUserContext();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!user) return;

            try {
                const userPosts = await getUserPosts(user._id);
                setPosts(userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };
        fetchUserPosts();
    }, [user]);
    return (
        <div className="max-w-[1000px] mx-auto">
            <h1 className="text-3xl mb-2">My Posts</h1>
            <PostGrid posts={posts} />
        </div>
    );
}
