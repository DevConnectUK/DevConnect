import { Link } from "react-router-dom";
import { logoutUser } from "../../api/user";
import { useUserContext } from "../context/UserContext";

export default function NavBar() {
    const [user] = useUserContext();
    return (
        <nav className="p-4">
            <div className="container mx-auto flex justify-between">
                <div>
                    <Link to="/" className="text-white">
                        Home
                    </Link>
                </div>
                <div>
                    {user != null ? (
                        <LoggedInSection />
                    ) : (
                        <NotLoggedInSection />
                    )}
                </div>
            </div>
        </nav>
    );
}

function LoggedInSection() {
    const [, setLoggedInUser] = useUserContext();

    async function handleLogout() {
        try {
            await logoutUser();
            setLoggedInUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <>
            <Link to="/profile" className="text-white">
                Profile
            </Link>
            <button onClick={handleLogout} className="text-white ml-4">
                Logout
            </button>
        </>
    );
}

function NotLoggedInSection() {
    return (
        <>
            <Link to="/login" className="text-white">
                Login
            </Link>
            <Link to="/register" className="text-white ml-4">
                Register
            </Link>
        </>
    );
}
