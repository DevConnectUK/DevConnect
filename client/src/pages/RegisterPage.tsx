import RegisterForm from "../components/form/RegisterForm";
import { SetUserProps } from "../components/form/SetUserProps";

export default function RegisterPage({ setLoggedInUser }: SetUserProps) {
    return (
        <div className="max-w-md mx-auto">
            <RegisterForm setLoggedInUser={setLoggedInUser} />
        </div>
    );
}
