import Link from "next/link";

interface AuthNavigationProps {
    text: string;
    linkText: string;
    href: string;
}

export default function AuthNavigation({ text, linkText, href }: AuthNavigationProps) {
    return (
        <div className="flex justify-center">
            <Link href={href} className="text-white text-sm">
                {text} {linkText}
            </Link>
        </div>
    )
}
