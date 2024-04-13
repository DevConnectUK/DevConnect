import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../../api/post";
import FormItem from "./FormItem";
import { CreatePostInput } from "../../models/post";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreatePostInput>();

    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function onSubmit(formData: CreatePostInput) {
        setError("");
        try {
            const post = await createPost(formData);
            navigate(`/post/${post._id}`);
        } catch (error: any) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="py-4 w-full max-w-md"
            >
                <FormItem
                    name="content"
                    label="Content"
                    register={register}
                    registerOptions={{ required: "Content is required" }}
                    type="text"
                    error={errors.content}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="py-3">
                    <button
                        type="submit"
                        className="standard-button w-full"
                        disabled={isSubmitting}
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
}
