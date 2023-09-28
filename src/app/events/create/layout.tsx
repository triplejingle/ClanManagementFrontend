'use client'
import {Profiler, useCallback, useEffect, useMemo, useState} from "react";
import CreateFormLayout from "@/components/form/CreateFormLayout";
import {eventSchema} from "@/domain/event";
import {useAppDispatch} from "@/hooks/hooks";
import {createEvent} from "@/redux/event/eventThunks";
import {useRouter} from 'next/navigation'
import {Event} from '@/domain/event'

type LayoutProps = {
    children: React.ReactNode
}
export default function Layout({children}: LayoutProps) {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const onSubmit =(data: Event) =>{
        dispatch(createEvent(data)).then((response: any) => {
            if (response.meta.requestStatus == 'fulfilled') {
                router.push("/events")
                console.log(data)
            }
        });
    }

    return (<>
            <CreateFormLayout
                title={"Event"}
                description={"Enter general information about the event here"}
                onSubmit={onSubmit}
                schema={eventSchema}
            >
                {children}
            </CreateFormLayout>
        </>
    )
}