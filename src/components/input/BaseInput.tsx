import {useFormContext} from "react-hook-form";
import React from "react";

type BaseInputProps = {
    name:string;
}
export default function BaseInput({name}: BaseInputProps){

    const {register} = useFormContext()
    return (
        <input
            {...register(name)}
            type="text"
            name={name}
            id={name}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />

    )
}