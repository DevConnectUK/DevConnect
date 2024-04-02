import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import FormItem from "./customInput";
import { LoginUserInput } from "../../models/user";
import { SetUserProps } from "./SetUserProps";

export default function LoginForm({ setLoggedInUser }: SetUserProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginUserInput>();

    async function onSubmit(formData: LoginUserInput) {
        try {
            const user = await loginUser(formData);
            setLoggedInUser(user);
            reset();
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <FormItem
                name="username"
                label="Username"
                register={register}
                registerOptions={{ required: "Required" }}
                type="text"
                error={errors.username}
            />
            <FormItem
                name="password"
                label="Password"
                register={register}
                registerOptions={{ required: "Required" }}
                type="password"
                error={errors.password}
            />
            <div className="py-3">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    disabled={isSubmitting}
                >
                    Login
                </button>
            </div>
        </form>
    );
}
