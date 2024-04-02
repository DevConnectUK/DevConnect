import LoginForm from "../components/form/LoginForm";
import { SetUserProps } from "../components/form/SetUserProps";

export default function LoginPage({ setLoggedInUser }: SetUserProps) {
    return (
        <div className="max-w-md mx-auto">
            <LoginForm setLoggedInUser={setLoggedInUser} />
        </div>
    );
}
