import { useEffect, useState } from "react";
import { useUserContext } from "../components/context/UserContext";
import PostForm from "../components/form/PostForm";
import { Post } from "../models/post";
import { getUserPosts } from "../api/post";
import PostGrid from "../components/post/PostGrid";

export default function ProfilePage() {
    const [user] = useUserContext();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!user) return;

            try {
                const userPosts = await getUserPosts(user._id);
                console.log(userPosts);
                setPosts(userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, [user]);

    if (!user) {
        return <h1>User not logged in</h1>;
    }

    return (
        <div className="max-w-md mx-auto">
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
            <PostForm />
            <PostGrid posts={posts} />
        </div>
    );
}
