import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import ProfilePage from "./pages/ProfilePage";
import { getLoggedInUser } from "./api/user";

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error("Error fetching logged in user:", error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <>
            <NavBar
                loggedIn={loggedInUser != null}
                setLoggedInUser={setLoggedInUser}
            />
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage setLoggedInUser={setLoggedInUser} />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage setLoggedInUser={setLoggedInUser} />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage user={loggedInUser} />}
                />
            </Routes>
        </>
    );
}

export default App;
