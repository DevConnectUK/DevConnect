import { Link } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";
import UserForm from "@/components/forms/UserForm";

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
        <div className="max-w-[1000px] mx-auto">
            <h1 className="text-3xl mb-2">Profile</h1>
            <div className="flex justify-between gap-44">
                <div className="flex-[2]">
                    <UserForm />
                </div>
                <div className="flex-1">
                    <Link
                        to="/create-post"
                        className="block standard-button mb-2"
                    >
                        Create Post
                    </Link>
                    <Link to="/posts" className="block standard-button">
                        My Posts
                    </Link>
                </div>
            </div>
        </div>
    );
}
