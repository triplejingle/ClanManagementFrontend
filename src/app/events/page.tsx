'use client'
import LinkButton from "@/components/button/LinkButton";
import LinkText from "@/components/text/LinkText";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";

import {Event} from '@/domain/event'
import {useEffect} from "react";

import {fetchEvents} from "@/redux/event/eventThunks";
import DeleteButton from "@/components/button/DeleteButton";

export default function Page() {
    const events = useAppSelector((state) => state.reducers.event.events);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

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
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                    Event
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Code
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Start date
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    End date
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                            {events.map((event: Event) => (
                                <tr key={event.eventid}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                        {event.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.eventcode}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.startdate?.toString()}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.enddate?.toString()}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <LinkText text={"Edit event"} page={"events/" + event.eventid}/>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <DeleteButton />
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