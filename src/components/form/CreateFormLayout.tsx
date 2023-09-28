import CancelButton from "@/components/button/CancelButton";
import SaveButton from "@/components/button/SaveButton";
import React, {useCallback, useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import CreateButton from "@/components/button/CreateButton";
import BaseFormLayout from "@/components/form/BaseFormLayout";

type CreateFormLayoutProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit: (data: any) => void;
    schema: yup.ObjectSchema<any>;
}
export default function CreateFormLayout({title, description, children, onSubmit, schema}: CreateFormLayoutProps) {
    const methods = useForm({resolver: yupResolver(schema),defaultValues: {eventid:-1}});

   // useEffect(()=>{
   //     console.log("on submit changed")
   // },[onSubmit])

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <BaseFormLayout
                    title={title}
                    description={description}
                    buttons={
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <CancelButton/>
                            <CreateButton/>
                        </div>
                    }
                >
                    {children}
                </BaseFormLayout>
            </form>
        </FormProvider>
    )

}