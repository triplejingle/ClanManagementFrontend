'use client'

import 'moment/locale/de';
import React, {useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import NullableDateTimePicker from "@/components/input/NullableDateTimePicker";
import NullableTextInput from "@/components/input/NullableTextInput";
import RequiredInput from "@/components/input/RequiredTextInput";
import {useParams, useRouter} from "next/navigation";
import Teams from "@/app/events/[eventid]/teams";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {Event, eventSchema} from "@/domain/event";
import {fetchEvents, updateEvent} from "@/redux/event/eventThunks";
import EditFormLayout from "@/components/form/EditFormLayout";
import {FAILURE_STATUS, IDLE_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {toast} from "react-toastify";

export default function Page() {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const params = useParams();
    const event = useAppSelector((state) => state.reducers.event.events.find(
        (e: Event) => e.eventid?.toString() == params.eventid))
    const eventState = useAppSelector((state) => state.reducers.event.status);

    useEffect(() => {
        if (eventState == IDLE_STATUS) {
            dispatch(fetchEvents())
        }
    }, [eventState])
    const toastId:any = React.useRef();

    function onSubmit(event: Event) {
        toastId.current = toast.info('Saving in progress, please wait...');
        dispatch(updateEvent(event)).then((response: any) => {
            if (eventState == SUCCESS_STATUS) {
                toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Event updated"});
                router.push("/events")
            }
            if (eventState == FAILURE_STATUS) {
                toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 5000, render: "Something went wrong"});
            }
        });
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