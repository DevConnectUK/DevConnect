import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const lsDark = localStorage.getItem("darkMode");
        return lsDark === "true" ? true : false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    const handleToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div>
            <div className="flex items-center cursor-pointer">
                <div className="mr-3 font-medium">
                    Switch to {darkMode ? "Light Mode" : "Dark Mode"}
                </div>
                <div className="relative" onClick={handleToggle}>
                    <input
                        type="checkbox"
                        id="toggle"
                        className="sr-only"
                        checked={darkMode}
                        readOnly
                    />
                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div
                        className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition ${
                            darkMode
                                ? "transform translate-x-full bg-black"
                                : "bg-white"
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
}
