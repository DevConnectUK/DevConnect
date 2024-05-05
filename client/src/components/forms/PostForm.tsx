import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createPost, updatePostById } from "@/api/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { PostInput, postSchema } from "@/types/post";

type PostFormProps = {
    defaultValues?: PostInput;
    postId?: string;
};

export default function PostForm({ defaultValues, postId }: PostFormProps) {
    const form = useForm<PostInput>({
        resolver: zodResolver(postSchema),
        defaultValues: defaultValues,
    });

    const navigate = useNavigate();

    async function onSubmit(formData: PostInput) {
        if (postId) {
            updatePostById(postId, formData)
                .then(() => {
                    navigate("/profile");
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                });
        } else {
            createPost(formData)
                .then((response) => {
                    navigate(`/post/${response.data._id}`);
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                What do you want to share?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
