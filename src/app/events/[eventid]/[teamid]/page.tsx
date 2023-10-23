"use client"
import React, {useEffect} from "react";


import EditFormLayout from "@/components/form/EditFormLayout";
import {Team, teamSchema} from "@/domain/team";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import RequiredInput from "@/components/input/RequiredTextInput";
import {fetchTeams, updateTeam} from "@/redux/team/teamThunks";
import {useRouter} from "next/navigation";
import {IDLE_STATUS} from "@/redux/stateStatus";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";
import PersonsOverview from "@/app/events/[eventid]/[teamid]/personsOverview";
import {selectTeamById} from "@/redux/team/teamAdapter";


export default function Page({params}: { params: { eventid: number, teamid: number } }) {
    const team = useAppSelector((state) => selectTeamById(state, params.teamid));
    const teamState = useAppSelector((state) => state.teamSlice.status);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toastId: any = React.useRef();
    useEffect(() => {
        if (teamState == IDLE_STATUS) {
            dispatch(fetchTeams());
        }
    }, [teamState])

    function onSubmit(newData: Team) {
        IdleToast({toastId: toastId});
        dispatch(updateTeam(newData)).then((test) => {
            if (updateTeam.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: "Team updated"
                });
                router.push("/events/" + params.eventid)
            }
            if (updateTeam.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Something went wrong."
                });
            }
        })
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
                <PersonsOverview eventid={params.eventid} teamid={params.teamid}/>
            </div>
        </EditFormLayout>
    </>);
}