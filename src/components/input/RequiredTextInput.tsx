"use client"
import {useFormContext} from "react-hook-form";
import React, {useEffect, useRef} from "react";
import BaseTextInput from "@/components/input/BaseTextInput";
import BaseLabel from "@/components/text/BaseLabel";
import BaseDescription from "@/components/text/BaseDescription";
import {ExclamationCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import autoAnimate from "@formkit/auto-animate";

type RequiredTextInput = {
    label: string;
    description?: string;
    name: string;
}

function RequiredInput({label, description, name}: RequiredTextInput) {
    const {formState: {errors}} = useFormContext();
    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current)

    }, [parent])


    return (<div ref={parent}>
            <BaseLabel
                label={label + " *"}
                name={name}
            />
            {description &&
                <BaseDescription
                    description={description}
                />
            }
            <div className="relative mt-2 rounded-md shadow-sm">
                <BaseTextInput
                    name={name}
                    className={errors[name] ?
                        "block w-full rounded-md border-1 py-1.5 pr-10 text-white ring-2  ring-red-500 focus:ring-2 focus:ring-red-900 sm:text-sm sm:leading-6" : ""}/>
                {errors[name] && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                </div>}
            </div>
            {errors[name] &&
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">This is required</h3>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RequiredInput;