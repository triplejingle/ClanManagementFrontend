import Link from "next/link";

interface LinkTextProps {
    page: string;
    text: string;
}

export default function LinkText({page, text}: LinkTextProps) {


    return <Link href={page} data-cy={text} className="text-indigo-400 hover:text-indigo-200">
        {text}
    </Link>
}