import { ComponentProps, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ComponentProps<"input"> {
    label?: string;
    error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                {label && <label className="text-white text-sm">{label}</label>}
                <input
                    ref={ref}
                    className={`w-full py-2 ring-1 ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition ${className ?? ''}`}
                    {...props}
                />
                {error && <span className="text-red-500 text-xs">{error.message}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
