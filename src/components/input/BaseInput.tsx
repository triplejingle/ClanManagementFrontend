import {useFormContext} from "react-hook-form";
import React from "react";

type BaseInputProps ={
    name:string;
    className:string;
}
export default function BaseInput({name,className}: BaseInputProps){
    const {register} = useFormContext()
    return (
        <>
            abc
        <input
            {...register(name)}
            type="text"
            name={name}
            id={name}
            className={"block w-full rounded-md border-0 bg-white/5 py-1.5 text-white "+className}
        />
        </>
    )
}