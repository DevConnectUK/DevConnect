import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "@/types/post";
import { getPostById } from "@/api/post";
import PostForm from "@/components/forms/PostForm";
import { AxiosError } from "axios";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                return;
            }

            getPostById(id)
                .then((response) => {
                    setPost(response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                });
        };

        fetchPost();
    }, [id]);

    if (!id) {
        return (
            <div className="max-w-[700px] mx-auto">
                <p>No post ID provided</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-[700px] mx-auto">
                <p>Loading post...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[700px] mx-auto">
            <PostForm defaultValues={post} postId={post._id} />
        </div>
    );
}
