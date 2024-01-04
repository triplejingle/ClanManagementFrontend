import BackButton from "@/components/button/BackButton";
import React from "react";
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
    returnUrl: string;
}
export default function CreateFormLayout({
                                             title,
                                             description,
                                             children,
                                             onSubmit,
                                             schema,
                                             returnUrl
                                         }: CreateFormLayoutProps) {
    const methods = useForm({resolver: yupResolver(schema), defaultValues: {eventid: -1}});

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <BaseFormLayout
                    title={title}
                    description={description}
                    buttons={
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <BackButton page={returnUrl}/>
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