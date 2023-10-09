import React from "react";
import {useAppDispatch} from "@/hooks/hooks";
import {deleteEvent} from "@/redux/event/eventThunks";

interface DeleteButtonProps{
    id: number
}
export default function DeleteButton({id}: DeleteButtonProps){
    const dispatch = useAppDispatch();
    function deleteOnClick(){
        dispatch(deleteEvent(id));
    }

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