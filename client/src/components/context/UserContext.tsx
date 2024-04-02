import { createContext, useContext, useState } from "react";
import { User } from "../../models/user";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
export function useUserContext(): [
    User | null,
    React.Dispatch<React.SetStateAction<User | null>>
] {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    const { user, setUser } = context;
    return [user, setUser];
}
