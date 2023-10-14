import React from "react";

interface PersonProps {
    teamid: number;
}

export default function Persons({teamid}: PersonProps) {


    return (<div></div>)
    // className={"mt-3 flex flex-row gap-x-2.5 text-xs leading-5 text-gray-400"}>
    // {teams.people.map((person) => (
    //     <div className={"flex items-center gap-x-2.5 text-xs text-gray-400"}
    //          key={person.name}>
    //         <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
    //             <circle cx={1} cy={1} r={1}/>
    //         </svg>
    //         {person.name}
    //     </div>
    // ))}
}