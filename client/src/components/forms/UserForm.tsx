import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { registerUser, updateUser } from "@/api/user";
import { useUserContext } from "@/contexts/UserContext";
import { AxiosError } from "axios";
import { UserProfileInput, userProfileSchema } from "@/types/user";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
    const [currentUser, setLoggedInUser] = useUserContext();
    const form = useForm<UserProfileInput>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            firstName: currentUser?.firstName || "",
            lastName: currentUser?.lastName || "",
            username: currentUser?.username || "",
            email: currentUser?.email || "",
            password: currentUser?.password || "",
        },
    });

    console.log(currentUser);

    const navigate = useNavigate();

    async function onSubmit(formData: UserProfileInput) {
        if (currentUser) {
            updateUser(formData)
                .then((response) => {
                    setLoggedInUser(response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                    form.setError("root", { message: error.message });
                });
        } else {
            registerUser(formData)
                .then((response) => {
                    setLoggedInUser(response.data);
                    navigate("/profile");
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                    form.setError("root", { message: error.message });
                });
        }
    }
    const formatLabel = (name: string) => {
        return (
            name.charAt(0).toUpperCase() +
            name
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()
        );
    };

    const keys: (keyof UserProfileInput)[] = [
        "firstName",
        "lastName",
        "username",
        "email",
    ];

    if (!currentUser) {
        keys.push("password");
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 py-4"
            >
                {keys.map((fieldName) => (
                    <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{formatLabel(fieldName)}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={
                                            fieldName === "password"
                                                ? "password"
                                                : "text"
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {currentUser ? "Update" : "Register"}
                </Button>
            </form>
        </Form>
    );
}
