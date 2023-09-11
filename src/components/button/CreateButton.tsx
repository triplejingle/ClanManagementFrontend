import Link from "next/link";


export default function CreateButton() {
    return (
        <button
            type="submit"
            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
           Create
        </button>);
}