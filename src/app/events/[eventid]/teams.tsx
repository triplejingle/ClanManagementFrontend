import {ChevronRightIcon} from '@heroicons/react/20/solid'
import React, {useEffect, useRef} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {deleteTeam, fetchTeams} from "@/redux/team/teamThunks";
import {FAILURE_STATUS, IDLE_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import Persons from "@/app/events/[eventid]/persons";
import DeleteButton from "@/components/button/DeleteButton";
import {toast} from "react-toastify";
import LinkButton from "@/components/button/LinkButton";


export default function Teams() {
    const params = useParams();
    const eventid: number = parseInt(params.eventid as string);
    const dispatch = useAppDispatch();
    const teams =
        useAppSelector((state) => state.reducers.team.teams.filter(t => t.eventid == eventid));
    const teamsState = useAppSelector((state) => state.reducers.team.status);
    const toastId = useRef(null);

    useEffect(() => {
        if (teamsState == IDLE_STATUS) {
            dispatch(fetchTeams());
        }
    }, [teamsState, dispatch])

    function deleteOnClick(id: number, teamName: string) {
        toastId.current = toast.info("Deleting in progress, please wait...")
        dispatch(deleteTeam(id)).then((response: any) => {
                if (teamsState == FAILURE_STATUS) {
                    toastId.current = toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 5000, render: "Something went wrong"})
                }
                if (teamsState == SUCCESS_STATUS) {
                    toastId.current = toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 5000, render: teamName + " deleted"})
                }
            }
        )
    }

    return (
        <div className={"py-5"}>
            <div className={"flex justify-between"}>
                <h2 className=" text-base font-semibold leading-7 text-white ">
                    Participants organized by team
                </h2>
                <div className="ml-2 md:-mx-0 sm:ml-16 sm:mt-0 sm:flex-none">
                    <LinkButton text={"Create"} page={eventid + "/teams"}/>
                </div>
            </div>
            <ul role="list" className="divide-y divide-white/5">
                {teams.map((team) => (
                    <li key={team.teamid} className="relative flex items-center space-x-4 py-4">
                        <div className="min-w-0 flex-auto">
                            <div className="flex items-center gap-x-3">
                                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                                    <Link href={eventid + "/" + team.teamid} className="flex gap-x-2">
                                        <span className="truncate text-gray-400">{team.name}</span>
                                        <span
                                            className="invisible md:visible absolute md:relative text-gray-400">|</span>
                                        <span
                                            className="invisible md:visible absolute md:relative whitespace-nowrap text-gray-400 ">Teamsize: 4</span>
                                    </Link>
                                </h2>
                            </div>
                            <Persons teamid={team.teamid as number}/>
                        </div>
                        <Link
                            href={eventid + "/" + team.teamid}
                            className="text-indigo-400 hover:text-indigo-200">
                            {"Edit teams"}
                        </Link>

                        <ChevronRightIcon
                            className="invisible md:visible absolute md:relative h-5 w-5 flex-none text-gray-400"
                            aria-hidden="true"/>
                        <DeleteButton deleteOnClick={() => deleteOnClick(team.teamid as number, team.name)}/>
                    </li>

                ))}
            </ul>
        </div>
    )
}