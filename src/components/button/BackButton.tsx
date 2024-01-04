import React from "react";
import Link from "next/link";

interface CancelButtonProps {
    page: string;
}

export default function BackButton({page}: CancelButtonProps) {

    return (
        <Link href={page}>
            <button
                type="button"
                data-cy="cancel"
                className="text-sm font-semibold leading-6 text-white"
            >
                Back
            </button>
        </Link>
    )
}