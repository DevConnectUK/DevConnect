import { User } from "../../models/user";

export interface SetUserProps {
    setLoggedInUser: (user: User | null) => void;
}
