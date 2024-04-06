import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../models/post";
import { getPostById } from "../api/post";
import PostCard from "../components/post/PostCard";

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

    return (
        <div>{post ? <PostCard post={post} /> : <p>Loading post...</p>}</div>
    );
}
