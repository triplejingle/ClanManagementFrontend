import React from "react";
import Link from "next/link";

interface CancelButtonProps {
    page: string;
}

export default function CancelButton({page}: CancelButtonProps) {

    return (
        <Link href={page}>
            <button
                type="button"
                className="text-sm font-semibold leading-6 text-white"
            >
                Cancel
            </button>
        </Link>
    )
}