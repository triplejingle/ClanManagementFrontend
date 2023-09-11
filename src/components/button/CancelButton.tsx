import React from "react";
import Link from "next/link";


export default function CancelButton(){

    return (
        <Link href={"/events"}>
            <button
                type="button"
                className="text-sm font-semibold leading-6 text-white"
            >
                Cancel
            </button>
        </Link>
     )
}