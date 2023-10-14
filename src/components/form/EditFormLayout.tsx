import CancelButton from "@/components/button/CancelButton";
import SaveButton from "@/components/button/SaveButton";
import React from "react";

import * as yup from "yup"
import BaseFormLayout from "@/components/form/BaseFormLayout";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

type EditFormLayoutProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit: (data: any) => void;
    schema: yup.ObjectSchema<any>;
    defaultValues: {};
    returnUrl: string;
}
export default function EditFormLayout({title, description, children, onSubmit, schema, defaultValues, returnUrl}: EditFormLayoutProps) {
    const methods = useForm({resolver: yupResolver(schema), defaultValues: defaultValues});

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <BaseFormLayout
                    title={title}
                    description={description}
                    buttons={
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <CancelButton page={returnUrl}/>
                            <SaveButton/>
                        </div>
                    }
                >
                    {children}
                </BaseFormLayout>
            </form>
        </FormProvider>
    )

}