import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../../api/post";
import FormItem from "./FormItem";
import { CreatePostInput } from "../../models/post";

export default function PostForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreatePostInput>();

    const [error, setError] = useState("");

    async function onSubmit(formData: CreatePostInput) {
        setError("");
        try {
            await createPost(formData);
        } catch (error: any) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <FormItem
                name="title"
                label="Title"
                register={register}
                registerOptions={{ required: "Title is required" }}
                type="text"
                error={errors.title}
            />
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
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                    disabled={isSubmitting}
                >
                    Create Post
                </button>
            </div>
        </form>
    );
}
