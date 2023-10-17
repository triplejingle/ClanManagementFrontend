'use client'

import 'moment/locale/de';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import NullableDateTimePicker from "@/components/input/NullableDateTimePicker";
import NullableTextInput from "@/components/input/NullableTextInput";
import RequiredInput from "@/components/input/RequiredTextInput";
import {useParams, useRouter} from "next/navigation";
import Teams from "@/app/events/[eventid]/teams";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {Event, eventSchema} from "@/domain/event";
import {updateEvent} from "@/redux/event/eventThunks";
import EditFormLayout from "@/components/form/EditFormLayout";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";

export default function Page() {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const params = useParams();
    const event = useAppSelector((state) => state.reducers.event.events.find(
        (e: Event) => e.eventid?.toString() == params.eventid))
    const toastId: any = React.useRef();

    function onSubmit(event: Event) {
        IdleToast({toastId: toastId});
        dispatch(updateEvent(event)).then((test) => {
            if (updateEvent.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: "Event updated"
                });
                router.push("/events")
            }
            if (updateEvent.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Something went wrong."
                });
            }
        })
    }

    if (!event)
        return <></>
    return (
        <EditFormLayout
            title={"Event"}
            description={"Enter general information about the event here"}
            onSubmit={onSubmit}
            schema={eventSchema}
            defaultValues={event}
            returnUrl={"/events"}
        >
            <div className={"grid grid-cols-1 bg-gray-700/10 py-10 px-5"}>
                <div className={"flex flex-col space-y-5"}>
                    <RequiredInput
                        label={"Event name"}
                        name={"name"}
                    />
                    <NullableTextInput
                        label={"Event code"}
                        description={"The code to join the event. Send this code to the participants."}
                        name={"eventcode"}
                    />
                </div>
                <div className="mt-6 flex flex-row flex-wrap  gap-x-6 ">
                    <NullableDateTimePicker
                        label={"Start Date/time"}
                        name={"startdate"}
                    />
                    <NullableDateTimePicker
                        label={"End Date/time"}
                        name={"enddate"}
                    />
                </div>
            </div>
            <Teams/>
        </EditFormLayout>
    )
}