"use client"
import React, {useEffect} from "react";


import EditFormLayout from "@/components/form/EditFormLayout";
import {Team, teamSchema} from "@/domain/team";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import RequiredInput from "@/components/input/RequiredTextInput";
import {fetchTeams, updateTeam} from "@/redux/team/teamThunks";
import {useRouter} from "next/navigation";
import {FAILURE_STATUS, IDLE_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {toast} from "react-toastify";


export default function Page({params}: { params: { eventid: number, teamid: number } }) {
    const team = useAppSelector((state) =>
        state.reducers.team.teams.find(t => t.teamid == params.teamid));
    const teamState = useAppSelector((state) => state.reducers.team.status);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toastId:any = React.useRef();
    useEffect(() => {
        if (teamState == IDLE_STATUS) {
            dispatch(fetchTeams());
        }
    }, [teamState])

    function onSubmit(newData: Team) {

        toastId.current = toast.info('Saving in progress, please wait...');
        dispatch(updateTeam(newData)).then((response: any) => {
                if (teamState == SUCCESS_STATUS) {
                    toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Team updated"});
                    router.push("/events/" + params.eventid)
                }
                if (teamState == FAILURE_STATUS) {
                    toast.update(toastId.current, {type: toast.TYPE.ERROR, autoClose: 5000, render: "Something went wrong"});
                }
            }
        ).catch((response: any) => {
            console.log(response)
        });
    }


    if (!team)
        return <></>
    return (<>
        <EditFormLayout
            title={"Team"}
            description={"Enter general information about the event here"}
            onSubmit={onSubmit}
            schema={teamSchema}
            defaultValues={team}
            returnUrl={"/events/" + params.eventid}
        >
            <div className={"grid grid-cols-1 bg-gray-700/10 py-10 px-5"}>
                <div className={"flex flex-col space-y-5"}>
                    <RequiredInput label={"Team name"} name={"name"}/>
                </div>
                <div className="mt-6 flex flex-row flex-wrap  gap-x-6 ">

                </div>
            </div>
        </EditFormLayout>
    </>);
}