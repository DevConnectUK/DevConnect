import { useUserContext } from "../components/context/UserContext";

export default function ProfilePage() {
    const [user] = useUserContext();

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
