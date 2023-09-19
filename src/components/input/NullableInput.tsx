import React from "react";
import {useFormContext} from "react-hook-form";
import BaseInput from "@/components/input/BaseInput";
import BaseLabel from "@/components/text/BaseLabel";
import BaseDescription from "@/components/text/BaseDescription";

type NullableInputProps = {
    label: string;
    description?: string;
    name: string;
}
export default function NullableInput({label, description, name}: NullableInputProps) {

    return (<div>
        <BaseLabel
            label={label}
            name={name}
        />
        {description &&
            <BaseDescription
                description={description}
            />
        }
        <div className="mt-2">
            <BaseInput className={""} name={name}/>
        </div>
    </div>)
}