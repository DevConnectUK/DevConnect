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
        return <p>No post ID provided</p>;
    }

    if (!post) {
        return <p>Loading post...</p>;
    }

    return (
        <div className="max-w-[700px] mx-auto">
            <UpdatePostForm post={post} />
        </div>
    );
}
