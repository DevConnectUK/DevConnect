import { useEffect, useState } from "react";
import { Post, UpdatePostInput } from "../../models/post";
import { updatePostById, deletePost } from "../../api/post";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

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

    async function handleDeletePost() {
        try {
            await deletePost(post._id);
            navigate("/profile");
        } catch (error: any) {
            console.error("Error deleting post:", error);
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="py-1 flex justify-center space-x-4">
                <button
                    type="submit"
                    className="standard-button w-full"
                    disabled={isSubmitting}
                >
                    Update
                </button>
                <button
                    onClick={handleDeletePost}
                    className="bg-red-500 py-2 px-4 rounded text-center hover:bg-red-600 w-full"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}
