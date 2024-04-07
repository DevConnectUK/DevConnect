import { useEffect, useState } from "react";
import { Post, UpdatePostInput } from "../../models/post";
import { updatePostById } from "../../api/post";
import { useForm } from "react-hook-form";
import FormItem from "./FormItem";

interface UpdatePostFormProps {
    post: Post;
}

export default function UpdatePostForm({ post }: UpdatePostFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdatePostInput>();

    const [error, setError] = useState("");

    useEffect(() => {
        reset(post);
    }, [post, reset]);

    async function onSubmit(formData: UpdatePostInput) {
        try {
            await updatePostById(post._id, formData);
        } catch (error: any) {
            console.error("Error updating post:", error);
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                name="title"
                label="Title"
                register={register}
                registerOptions={{ required: "Required" }}
                type="text"
                error={errors.title}
            />
            <div className="py-3">
                <label className="block pb-2">Content:</label>
                <textarea
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                    {...register("content", { required: "Required" })}
                ></textarea>
                {errors.content && (
                    <p className="text-red-500 text-sm">
                        {errors.content.message}
                    </p>
                )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="standard-button w-full"
                disabled={isSubmitting}
            >
                Update Post
            </button>
        </form>
    );
}
