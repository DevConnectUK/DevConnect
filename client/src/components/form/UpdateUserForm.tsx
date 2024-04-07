import { useForm } from "react-hook-form";
import FormItem from "./FormItem";
import { User, UpdateUserInput } from "../../models/user";
import { updateUser } from "../../api/user";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";

interface UserProfileFormProps {
    user: User;
}

export default function UserProfileForm({ user }: UserProfileFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserInput>();

    const [, setLoggedInUser] = useUserContext();
    const [error, setError] = useState("");

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    async function onSubmit(formData: UpdateUserInput) {
        try {
            const updatedUser = await updateUser(formData);
            setLoggedInUser(updatedUser);
        } catch (error: any) {
            console.error(error.message);
            setError(error.message);
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
            {/* Remove or keep the password field based on your update logic */}
            {error && <p className="text-red-500">{error}</p>}
            <div className="py-3">
                <button
                    type="submit"
                    className="standard-button w-full"
                    disabled={isSubmitting}
                >
                    Update
                </button>
            </div>
        </form>
    );
}
