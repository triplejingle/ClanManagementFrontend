import React from "react";
import 'react-toastify/dist/ReactToastify.min.css';

interface DeleteButtonProps{

    deleteOnClick: ()=>void;
}
export default function DeleteButton({deleteOnClick}: DeleteButtonProps){
    return (
        <button
            type="button"
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={()=>deleteOnClick()}
        >
            Delete
        </button>
    )
}