import React from "react";
import {useAppSelector} from "@/hooks/hooks";

interface PersonProps {
    teamid: number;
}

export default function Persons({ teamid}: PersonProps) {

    const participants =
        useAppSelector((state) => state.reducers.person.people.filter(t => t.teamid==teamid));

    return (
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
    )

}