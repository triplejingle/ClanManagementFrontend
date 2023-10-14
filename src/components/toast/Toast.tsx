import {AsyncThunk, AsyncThunkAction, PayloadAction} from "@reduxjs/toolkit";
import React from "react";
import {createEvent} from "@/redux/event/eventThunks";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/hooks/hooks";

interface ToastProps{
    url:string;
    dispatchFunction: AsyncThunkAction<any, any, any>;
    toastId: React.MutableRefObject<any>
}
export default function Toast({url, dispatchFunction,toastId}: ToastProps){

    const router = useRouter()
    const dispatch   = useAppDispatch();

    function showToast() {
        dispatch(dispatchFunction).then((response: any) => {
            if (response.meta.requestStatus == 'fulfilled') {
                toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Item saved"});
                router.push(url)
            }

        }).catch((response: any) => {
            toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 5000, render: "Something went wrong"});
        });
    }
    showToast();
}