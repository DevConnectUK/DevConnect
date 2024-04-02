import { User } from "../models/user";

interface ProfilePageProps {
    user: User | null;
}

export default function ProfilePage({ user }: ProfilePageProps) {
    if (!user) {
        return <h1>User not logged in</h1>;
    }
    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}
