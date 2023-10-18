import React from "react";
import {useAppSelector} from "@/hooks/hooks";
import Link from "next/link";
import {Team} from "@/domain/team";

interface PersonProps {
    team: Team;
}

export default function Persons({team}: PersonProps) {

    const participants =
        useAppSelector((state) => state.reducers.person.people.filter(t => t.teamid == team.teamid));

    return (
        <div>
            <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                    <Link href={team.eventid + "/" + team.teamid} className="flex gap-x-2">
                        <span className="truncate text-gray-400">{team.name}</span>
                        <span
                            className="invisible md:visible absolute md:relative text-gray-400">|</span>
                        <span
                            className="invisible md:visible absolute md:relative whitespace-nowrap text-gray-400 ">Teamsize: {participants.length}</span>
                    </Link>
                </h2>
            </div>
            <div
                className={"mt-3 flex flex-row gap-x-2.5 text-xs leading-5 text-gray-400"}>
                {participants.map((person) => (
                    <div className={"flex items-center gap-x-2.5 text-xs text-gray-400"}
                         key={person.name}>
                        <svg viewBox="0 0 2 2" className="h-2 w-2 flex-none fill-red-300">
                            <circle cx={1} cy={1} r={1}/>
                        </svg>
                        {person.name}
                    </div>
                ))}
            </div>
        </div>
    )

}