import {useFormContext} from "react-hook-form";
import React from "react";
import BaseInput from "@/components/input/BaseInput";
import BaseLabel from "@/components/text/BaseLabel";
import BaseDescription from "@/components/text/BaseDescription";

type RequiredInput = {
    label: string;
    description?: string;
    name: string;
}
export default function RequiredInput({label, description, name}: RequiredInput) {
    const {formState: {errors}} = useFormContext();

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
                <BaseInput name={name}/>
                {errors[name] && <p> {name} is required</p>}
            </div>
        </div>
    )
}