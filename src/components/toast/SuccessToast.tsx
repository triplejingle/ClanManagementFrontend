import React from "react";
import {toast} from "react-toastify";

interface ToastProps {
    toastId: {current: any}//React.MutableRefObject<any>
    message?:string
}
export function IdleToast({toastId}: ToastProps) {
    function showToast(toastId: React.MutableRefObject<any>) {
        toastId.current = toast.info("In progress, please wait...")
    }

    showToast(toastId);
}
export function SuccessToast({toastId, message}: ToastProps) {
    function showToast() {
        toastId.current = toast.update(toastId.current, {
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            render: message?message:"Success"
        })
    }

    showToast();
}

export function ErrorToast({toastId, message}: ToastProps) {
    function showToast() {
        toastId.current = toast.update(toastId.current, {
            type: toast.TYPE.ERROR,
            autoClose: 5000,
            render: message?message:"Something went wrong"
        })
    }

    showToast();
}


