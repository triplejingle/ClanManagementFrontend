import {useFormContext} from "react-hook-form";
import React from "react";
import BaseInput from "@/components/input/BaseInput";
import BaseLabel from "@/components/text/BaseLabel";
import BaseDescription from "@/components/text/BaseDescription";
import {XCircleIcon} from "@heroicons/react/20/solid";
import ErrorInput from "@/components/input/ErrorInput";

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
                {JSON.stringify(errors[name]?.message)}
                    <BaseInput name={name} className={"shadow-sm ring-1 ring-inset ring-red focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"}/>
                {errors[name] &&
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">This is required</h3>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}