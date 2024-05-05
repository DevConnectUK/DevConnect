import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <React.StrictMode>
            <BrowserRouter>
                <UserProvider>
                    <App />
                </UserProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);
