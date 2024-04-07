import { useEffect, useState } from "react";
import { getUserPosts } from "../api/post";
import PostGrid from "../components/common/post/PostGrid";
import { Post } from "../models/post";
import { useUserContext } from "../components/context/UserContext";

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
        <div>
            <PostGrid posts={posts} />
        </div>
    );
}
