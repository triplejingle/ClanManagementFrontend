import React from "react";

type BaseLabelProps ={
    label:string;
    name: string;
}
export default function BaseLabel({label,name} : BaseLabelProps){


    return (
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-white">
        {label}
    </label>)
}