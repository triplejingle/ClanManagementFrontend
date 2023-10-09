import {useFormContext} from "react-hook-form";
import React from "react";

type BaseTextInputProps ={
    name:string;
    className?:string;
    hidden?:boolean;
    autofocus?:boolean;
}
export default function BaseTextInput({name,className, hidden,autofocus}: BaseTextInputProps){
    const {register} = useFormContext()
    return (
        <input
            hidden={hidden}
            {...register(name)}
            type="text"
            name={name}

            id={name}
            className={className?className+" focus:outline-none bg-white/5 py-1.5":" focus:outline-none w-full rounded-md focus:border bg-white/5 py-1.5 text-white"}
            autoFocus={autofocus}
        />
    )
}