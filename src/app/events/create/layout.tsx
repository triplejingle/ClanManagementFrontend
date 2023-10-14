'use client'

import CreateFormLayout from "@/components/form/CreateFormLayout";
import {Event, eventSchema} from "@/domain/event";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {createEvent} from "@/redux/event/eventThunks";
import {useRouter} from 'next/navigation'
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import React from "react";
import {FAILURE_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";

type LayoutProps = {
    children: React.ReactNode
}
export default function Layout({children}: LayoutProps) {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const toastId:any = React.useRef();
    const eventState = useAppSelector((state) => state.reducers.event.status);
    const onSubmit = (data: Event) => {
        toastId.current = toast.info('Saving in progress, please wait...');
        dispatch(createEvent(data)).then((response: any) => {
            if (eventState == SUCCESS_STATUS) {
                toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Event created"});
                router.push("/events")
            }
            if (eventState == FAILURE_STATUS) {
                toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 5000, render: "Something went wrong"});
            }
        })
    }

    return (<>
            {/* Same as */}
            <CreateFormLayout
                title={"Event"}
                description={"Enter general information about the event here"}
                onSubmit={onSubmit}
                schema={eventSchema}
                returnUrl={"/events"}
            >
                {children}
            </CreateFormLayout>

        </>
    )
}