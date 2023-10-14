import React from "react";


type BaseDescriptionProps = {
    description: string;
}
export default function BaseDescription({description}: BaseDescriptionProps) {


    return (<p className="mt-1 text-sm leading-6 text-gray-400">
        {description}
    </p>)
}