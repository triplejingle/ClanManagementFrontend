import Link from "next/link";

type LinkButtonProps = {
    text: string;
    page: string;
}

export default function LinkButton({text, page}: LinkButtonProps) {
    return (<Link href={page}>
        <button
            type="button"
            data-cy="link"
            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
            {text}
        </button>
    </Link>);
}