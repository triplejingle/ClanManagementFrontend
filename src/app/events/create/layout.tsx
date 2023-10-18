'use client'

import CreateFormLayout from "@/components/form/CreateFormLayout";
import {Event, eventSchema} from "@/domain/event";
import {useAppDispatch} from "@/hooks/hooks";
import {createEvent} from "@/redux/event/eventThunks";
import {useRouter} from 'next/navigation'
import 'react-toastify/dist/ReactToastify.min.css';
import React from "react";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";

type LayoutProps = {
    children: React.ReactNode
}
export default function Layout({children}: LayoutProps) {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const toastId: any = React.useRef();
    const onSubmit = (data: Event) => {
        IdleToast({toastId: toastId});
        dispatch(createEvent(data)).then((test) => {
            if (createEvent.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: "Event created"
                });
                router.push("/events")
            }
            if (createEvent.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Cannot create event."
                });
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