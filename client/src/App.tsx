import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import { useEffect } from "react";
import { getLoggedInUser } from "./api/user";
import { useUserContext } from "./context/UserContext";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";

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
        <div className="bg-background-50">
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
            </Routes>
        </div>
    );
}

export default App;
