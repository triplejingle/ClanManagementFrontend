import React, {useEffect, useState} from "react";
import LinkButton from "@/components/button/LinkButton";
import Link from "next/link";
import DeleteButton from "@/components/button/DeleteButton";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";
import {deleteTeam} from "@/redux/team/teamThunks";
import {createPerson, deletePerson, fetchPersons} from "@/redux/person/personThunks";
import NullableTextInput from "@/components/input/NullableTextInput";
import {People} from "@/domain/people";
import {fetchEvents} from "@/redux/event/eventThunks";

interface PersonProps {
    eventid: number;
    teamid: number;
}

export default function PersonsOverview({eventid, teamid}: PersonProps) {
    const person =
        useAppSelector((state) => state.reducers.person.people.filter(p => p.teamid == teamid));
    const toastId: any = React.useRef();
    const dispatch = useAppDispatch();

    const [username, setUsername]=useState("");
    const personState = useAppSelector((state)=>state.reducers.person.status)
    useEffect(() => {
        dispatch(fetchPersons({eventid}))
    }, [personState])
    function deleteOnClick(id: number, teamName: string) {
        IdleToast({toastId: toastId});
        dispatch(deletePerson(id)).then((test) => {
            if (deletePerson.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: teamName + " deleted"
                });
            }
            if (deletePerson.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Something went wrong."
                });
            }
        })
    }

    function AddOnClick(){
        const person = {name: username, teamid: teamid} as People;
        IdleToast({toastId: toastId});
        dispatch(createPerson({teamid: teamid,person: person })).then((test) => {
            if (createPerson.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: username+" added"
                });
            }
            if (createPerson.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Something went wrong."
                });
            }
        })
        setUsername("");
    }

    return (
        <div className={"py-5"}>
            <div className={"flex flex-col sm:flex-row justify-between"}>
                <div className={"flex flex-col md:flex-row md:flex-wrap my-2 "}>
                    <h2 className="text-base font-semibold leading-7 text-white mr-5">
                        Participant
                    </h2>
                    <div className={"-mt-2"}>
                        <input
                            type="text"
                            name={"username"}
                            id={"username"}
                            className={" focus:outline-none w-full rounded-md focus:border bg-white/5 py-1.5 text-white"}
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={()=>AddOnClick()}
                >
                    Add
                </button>
            </div>
            <ul role="list" className="divide-y divide-white/5">
                {person.map((person) => (
                    <li key={person.personid} className="relative flex items-center space-x-4 py-4">
                        <div className="min-w-0 flex-auto">
                            <div className="flex items-center gap-x-3">
                                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">

                                        <span className="truncate text-gray-400">{person.name}</span>
                                </h2>
                            </div>

                        </div>
                        <DeleteButton deleteOnClick={() => deleteOnClick(person.personid as number, person.name)}/>
                    </li>

                ))}
            </ul>
        </div>
    )
}