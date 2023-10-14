import {useFormContext} from "react-hook-form";
import React from "react";

type BaseTextInputProps ={
    name:string;
    className?:string;
    hidden?:boolean;
}
 function BaseTextInput({name,className, hidden}: BaseTextInputProps){
    const {register} = useFormContext()
    return (
        <input
            hidden={hidden}

            {...register(name)}
            type="text"
            name={name}
            id={name}
            className={className?className+" focus:outline-none bg-white/5 py-1.5":" focus:outline-none w-full rounded-md focus:border bg-white/5 py-1.5 text-white"}
        />
    )
}


export default BaseTextInput;