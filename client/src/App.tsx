import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import { getLoggedInUser } from "./api/user";
import { useUserContext } from "./components/context/UserContext";

function App() {
    const [, setLoggedInUser] = useUserContext();

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
    }, [setLoggedInUser]);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
}

export default App;
