import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/user";
import { useUserContext } from "../context/UserContext";

export default function NavBar() {
    const [user] = useUserContext();
    return (
        <nav className="p-4">
            <div className="flex justify-between mx-4">
                <div>
                    <Link to="/">Home</Link>
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
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logoutUser();
            setLoggedInUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className=" ml-4">
                Logout
            </button>
        </>
    );
}

function NotLoggedInSection() {
    return (
        <>
            <Link to="/login">Login</Link>
            <Link to="/register" className=" ml-4">
                Register
            </Link>
        </>
    );
}
