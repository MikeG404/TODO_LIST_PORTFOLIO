interface AuthGlobalErrorProps {
    error: string;
}

export default function AuthGlobalError({ error }: AuthGlobalErrorProps) {
    if (!error) return null;
    return (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded text-sm text-center">
            {error}
        </div>
    );
}
