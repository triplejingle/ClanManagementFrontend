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
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";
import {selectEventById} from "@/redux/event/eventAdapter";
import Toggle from "@/components/toggle/toggle";
import LinkText from "@/components/text/LinkText";
import BackButton from "@/components/button/BackButton";
import {IDLE_STATUS} from "@/redux/stateStatus";

const eventrules = [
    {eventruleid:1,name: 'Maximal attempts', description: 'Limits the max attempts for each itemsource', type:"ismaxattemptsrule",enabled: false, isEditable: false},
    {eventruleid:2, name: 'Lindsay Walton', description: 'Front-end Developer',type:"ismaxattemptsrule", enabled: true, isEditable: true},
    // More people...
]
export default function Page() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const params = useParams();
    const event = useAppSelector((state) => selectEventById(state, params.eventid as string));
    const eventState = useAppSelector((state)=>state.eventSlice.status);
    const toastId: any = React.useRef();

    useEffect(()=>{
        if(eventState==IDLE_STATUS){
            dispatch(fetchEvents());
        }
    },[eventState])
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
    if(!event)
        return <></>
    return (
        <>
            <div className={"grid grid-cols-1 bg-gray-700/10 py-10 px-5"}>
                <EditFormLayout
                    title={"Event"}
                    description={"Enter general information about the event here"}
                    onSubmit={onSubmit}
                    schema={eventSchema}
                    defaultValues={event}
                    returnUrl={"/events"}
                >
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

                </EditFormLayout>
            </div>


            <div className="mt-8 flow-root">
                <div className="grid grid-cols-1 bg-gray-700/10 py-10 px-5 ">
                    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                        <div>
                            <h2 className=" text-base font-semibold leading-7 text-white ">
                                Event rules
                            </h2>
                        </div>
                        <div className="md:col-span-2">
                            <table className="min-w-full divide-y divide-gray-700 ">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="invisible md:visible absolute md:relative  px-3 py-3.5 text-left text-sm font-semibold text-white">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">

                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                {eventrules.map((eventrule) => (
                                    <tr key={eventrule.eventruleid}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                            {eventrule.name}
                                        </td>
                                        <td className="invisible md:visible absolute md:relative  whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {eventrule.description}
                                        </td>
                                        <td className={" flex justify-end space-x-4 py-4 "}>
                                            {eventrule.isEditable?<LinkText page={"/events/"+event.eventid+"/eventrules/"+eventrule.type} text={"Edit rule"}/>:<></>
                                            }
                                            <Toggle/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <BackButton page={"/events"}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Teams/>
        </>
    )
}