import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface FormItemProps {
    label: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    name: string;
    type: string;
    error?: FieldError;
    [x: string]: any;
}

export default function FormItem({
    name,
    label,
    register,
    registerOptions,
    error,
    ...props
}: FormItemProps) {
    return (
        <div className="py-3 ">
            <label className="block pb-2">{label}:</label>
            <input
                className="w-full border border-gray-600 rounded-md p-2 text-black"
                {...props}
                {...register(name, registerOptions)}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
