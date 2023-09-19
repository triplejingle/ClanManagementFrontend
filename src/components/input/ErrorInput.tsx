import React from "react";
import {useForm} from "react-hook-form";

interface ErrorInputProps{
    name:string
}
export default function ErrorInput({name}: ErrorInputProps){
    const {register} = useForm()
    return (
        <input
            {...register(name)}
            type="text"
            name={name}
            id={name}
            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white "
        />
    )
}