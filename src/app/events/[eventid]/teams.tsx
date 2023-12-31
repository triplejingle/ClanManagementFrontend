import {ChevronRightIcon} from '@heroicons/react/20/solid'
import React, {useEffect} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {deleteTeam, fetchTeams} from "@/redux/team/teamThunks";
import {IDLE_STATUS} from "@/redux/stateStatus";
import Persons from "@/app/events/[eventid]/persons";
import DeleteButton from "@/components/button/DeleteButton";
import LinkButton from "@/components/button/LinkButton";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";
import {fetchPersons} from "@/redux/person/personThunks";
import {selectAllTeams} from "@/redux/team/teamAdapter";
import BackButton from "@/components/button/BackButton";


export default function Teams() {
    const params = useParams();
    const eventid: number = parseInt(params.eventid as string);
    const dispatch = useAppDispatch();
    const teams =
        useAppSelector((state) => selectAllTeams(state));
    const teamsState = useAppSelector((state) => state.teamSlice.status);
    const toastId: any = React.useRef();

    useEffect(() => {
        dispatch(fetchPersons({eventid}))
    }, [])
    useEffect(() => {
        if (teamsState == IDLE_STATUS) {
            dispatch(fetchTeams());
        }
    }, [teamsState, dispatch])

    function deleteOnClick(id: number, teamName: string) {
        IdleToast({toastId: toastId});
        dispatch(deleteTeam(id)).then((test) => {
            if (deleteTeam.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: teamName + " deleted"
                });
            }
            if (deleteTeam.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Cannot delete team. Team still contains data."
                });
            }
        })
    }

    return (
        <div className={"grid grid-cols-1  py-10 px-5"}>
            <div className={"flex justify-between"}>
                <h2 className=" text-base font-semibold leading-7 text-white ">
                    Participants organized by team
                </h2>
                <div className="ml-2 md:-mx-0 sm:ml-16 sm:mt-0 sm:flex-none">
                    <LinkButton text={"Create"} page={eventid + "/teams"}/>
                </div>
            </div>
            <ul role="list" className="divide-y divide-white/5">
                {teams && teams.filter(t => t.eventid == eventid).map((team) => (
                    <li key={team.teamid} className="relative flex items-center space-x-4 py-4 ">
                        <div className="min-w-0 flex-auto">
                            <Persons team={team}/>
                        </div>
                        <Link
                            href={eventid + "/" + team.teamid}
                            className="text-indigo-400 hover:text-indigo-200">
                            {"Edit team"}
                        </Link>


                        <DeleteButton deleteOnClick={() => deleteOnClick(team.teamid as number, team.name)}/>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <BackButton page={"/events"}/>
            </div>
        </div>
    )
}