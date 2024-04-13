import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../models/post";
import { getPostById } from "../api/post";
import UpdatePostForm from "../components/form/UpdatePostForm";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!id) {
                    return;
                }
                const postData = await getPostById(id);
                setPost(postData);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
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
            <UpdatePostForm post={post} />
        </div>
    );
}
