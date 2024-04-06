// LoginForm.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import FormItem from "./FormItem";
import { LoginUserInput } from "../../models/user";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginUserInput>();

    const [, setLoggedInUser] = useUserContext();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function onSubmit(formData: LoginUserInput) {
        setError("");
        try {
            const user = await loginUser(formData);
            setLoggedInUser(user);
            navigate("/profile");
        } catch (error: any) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <FormItem
                name="username"
                label="Username"
                register={register}
                registerOptions={{ required: "Username is required" }}
                type="text"
                error={errors.username}
            />
            <FormItem
                name="password"
                label="Password"
                register={register}
                registerOptions={{ required: "Password is required" }}
                type="password"
                error={errors.password}
            />
            {error && <p className="text-red-500">{error}</p>}{" "}
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
