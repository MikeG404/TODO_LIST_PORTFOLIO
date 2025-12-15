interface SubmitButtonProps {
    children: React.ReactNode;
}

export default function SubmitButton({ children }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition font-medium mt-4"
        >
            {children}
        </button>
    )
}
