import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Post } from "../models/post";
import { getUserPosts } from "../api/post";
import PostGrid from "../components/post/PostGrid";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import DarkModeToggle from "../components/ui/DarkModeToggle";

export default function ProfilePage() {
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

    if (!user) {
        return (
            <div className="max-w-md mx-auto">
                <h1>User not logged in</h1>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto">
            <UserProfileCard user={user} />
            <DarkModeToggle />
            <Link
                to="/create-post"
                className="block bg-accent text-white py-2 px-4 rounded  w-full text-center"
            >
                Create Post
            </Link>
            <PostGrid posts={posts} />
        </div>
    );
}

interface UserProfileCardProps {
    user: User;
}

function UserProfileCard({ user }: UserProfileCardProps) {
    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}
