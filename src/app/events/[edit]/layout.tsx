'use client'

import {eventSchema} from "@/domain/event";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {createEvent} from "@/redux/event/eventThunks";
import {useParams, useRouter} from 'next/navigation'
import React from "react";
import EditFormLayout from "@/components/form/EditFormLayout";
import {Event} from '@/domain/event'
type LayoutProps = {
    children: React.ReactNode
}
export default function Layout({children}: LayoutProps) {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const params = useParams();
    const event = useAppSelector( (state)=> state.reducers.event.events.find(
        (e: Event)=>e.eventid?.toString()==params.edit))
    function onSubmit(data: Event) {
        dispatch(createEvent(data)).then((response :any) => {
            if (response.meta.requestStatus == 'fulfilled') {
                router.push("/events")
            }
        });
    }

    if(!event)
        return <></>
    return (<>
            <EditFormLayout
                title={"Event"}
                description={"Enter general information about the event here"}
                onSubmit={onSubmit}
                schema={eventSchema}
                defaultValues={event}>
                {children}
            </EditFormLayout>
        </>
    )
}