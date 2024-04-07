import { useUserContext } from "../components/context/UserContext";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import UserProfileForm from "../components/form/UpdateUserForm";

export default function ProfilePage() {
    const [user] = useUserContext();

    if (!user) {
        return (
            <div className="max-w-md mx-auto">
                <h1>User not logged in</h1>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto flex justify-between">
            <div className="flex-1">
                <DarkModeToggle />
                <UserProfileForm user={user} />
            </div>
            <div className="flex-1">
                <Link
                    to="/create-post"
                    className="block bg-accent py-2 px-4 rounded w-full text-center mb-4"
                >
                    Create Post
                </Link>
                <Link
                    to="/posts"
                    className="block bg-accent py-2 px-4 rounded w-full text-center"
                >
                    My Posts
                </Link>
            </div>
        </div>
    );
}
