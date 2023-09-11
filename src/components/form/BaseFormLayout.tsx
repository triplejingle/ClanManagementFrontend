import React from "react";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import CancelButton from "@/components/button/CancelButton";
import CreateButton from "@/components/button/CreateButton";


type BaseFormLayoutProps ={
    title:string;
    description: string;
    children: React.ReactNode;
    buttons:React.ReactNode;
}
export default function BaseFormLayout({title, description,children, buttons}: BaseFormLayoutProps){

    return (
            <div className="divide-y divide-white/5">
                <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-white">
                            {title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-400">
                            {description}
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        {children}
                        {buttons}
                    </div>
                </div>
            </div>
     )
}