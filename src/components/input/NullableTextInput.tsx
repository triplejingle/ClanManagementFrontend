import React from "react";
import BaseTextInput from "@/components/input/BaseTextInput";
import BaseLabel from "@/components/text/BaseLabel";
import BaseDescription from "@/components/text/BaseDescription";

type NullableTextInputProps = {
    label: string;
    description?: string;
    name: string;
}
export default function NullableTextInput({label, description, name}: NullableTextInputProps) {

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
            <BaseTextInput className={""} name={name}/>
        </div>
    </div>)
}