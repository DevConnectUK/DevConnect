import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "../../api/user";
import { LoginUserInput, userLoginSchema } from "@/types/user";
import { useUserContext } from "@/contexts/UserContext";
import { AxiosError } from "axios";

export default function LoginForm() {
    const form = useForm<LoginUserInput>({
        resolver: zodResolver(userLoginSchema),
    });

    const [, setLoggedInUser] = useUserContext();
    const navigate = useNavigate();

    async function onSubmit(formData: LoginUserInput) {
        loginUser(formData)
            .then((response) => {
                setLoggedInUser(response.data);
                navigate("/profile");
            })
            .catch((error: AxiosError) => {
                console.error(error.message);
                form.setError("root", {
                    type: "manual",
                    message: "Invalid username or password",
                });
            });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 py-4"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    Login
                </Button>
            </form>
        </Form>
    );
}
