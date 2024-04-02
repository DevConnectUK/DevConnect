import { useForm } from "react-hook-form";
import FormItem from "./FormItem";
import { RegisterUserInput } from "../../models/user";
import { registerUser } from "../../api/user";
import { useUserContext } from "../context/UserContext";

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterUserInput>();

    const [, setLoggedInUser] = useUserContext();

    async function onSubmit(formData: RegisterUserInput) {
        try {
            const user = await registerUser(formData);
            setLoggedInUser(user);
            reset();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <FormItem
                name="firstName"
                label="First Name"
                register={register}
                registerOptions={{ required: "Required" }}
                type="text"
                error={errors.firstName}
            />
            <FormItem
                name="lastName"
                label="Last Name"
                register={register}
                registerOptions={{ required: "Required" }}
                type="text"
                error={errors.lastName}
            />
            <FormItem
                name="username"
                label="Username"
                register={register}
                registerOptions={{ required: "Required" }}
                type="text"
                error={errors.username}
            />
            <FormItem
                name="email"
                label="Email"
                register={register}
                registerOptions={{ required: "Required" }}
                type="email"
                error={errors.email}
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
                    Register
                </button>
            </div>
        </form>
    );
}
