'use client'
import LinkButton from "@/components/button/LinkButton";
import LinkText from "@/components/text/LinkText";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";

import {Event} from '@/domain/event'
import React, {useEffect} from "react";

import {deleteEvent, fetchEvents} from "@/redux/event/eventThunks";
import DeleteButton from "@/components/button/DeleteButton";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";
import {allEvents} from "@/redux/event/eventAdapter";
import {selectALlAuthorizations} from "@/redux/authorization/authorizationAdapter";
import {IDLE_STATUS} from "@/redux/stateStatus";

export default function Page() {
    const events = useAppSelector(allEvents);
    const dispatch = useAppDispatch();
    const toastId: { current: any } = React.useRef();
    const role = useAppSelector(selectALlAuthorizations);
    const eventState = useAppSelector((state) => state.eventSlice.status)
    useEffect(() => {
        if (eventState == IDLE_STATUS) {
            dispatch(fetchEvents())
        }
    }, [eventState])

    function deleteOnClick(id: number, event: Event) {
        IdleToast({toastId: toastId});
        dispatch(deleteEvent(id)).then((test) => {
            if (deleteEvent.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: event.name + " deleted"
                });
            }
            if (deleteEvent.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Cannot delete. Event still contains data."
                });
            }
        })
    }
    if(!events)
        return <></>
    return (<div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-white">Events</h1>
                    <p className="mt-2 text-sm text-gray-300">
                        A list of all the events including relevant data
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <LinkButton text={"Create event"} page={"events/create"}/>
                </div>
            </div>
            <div className="mt-8 flow-root relative">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-700 ">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                    Event
                                </th>
                                <th scope="col"
                                    className="invisible md:visible absolute md:relative  px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Code
                                </th>
                                <th scope="col"
                                    className="invisible md:visible absolute md:relative  px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Start date
                                </th>
                                <th scope="col"
                                    className="invisible md:visible absolute md:relative  px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    End date
                                </th>
                                {/*<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">*/}
                                {/*    <span className="sr-only">Edit</span>*/}
                                {/*</th>*/}
                            </tr>
                            </thead>

                            <tbody
                                className="divide-y divide-gray-800 relative"
                            >
                            {events.length > 0 && events.map((event: Event) => (
                                <tr key={event.eventid}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                        {event.name}
                                    </td>
                                    <td className="invisible md:visible absolute md:relative whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.eventcode}</td>
                                    <td className="invisible md:visible absolute md:relative whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.startdate?.toString().replace("T", " ")}</td>
                                    <td className="invisible md:visible absolute md:relative whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.enddate?.toString().replace("T", " ")}</td>
                                    <td className=" whitespace-nowrap py-4 pl-3 pr-2 text-right text-sm font-medium sm:pr-0">
                                        <LinkText text={"Edit event"} page={"events/" + event.eventid}/>
                                    </td>
                                    <td className=" whitespace-nowrap py-4 pl-3 pr-4  text-right text-sm font-medium sm:pr-0">
                                        <DeleteButton
                                            deleteOnClick={() => deleteOnClick(event.eventid as number, event)}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}