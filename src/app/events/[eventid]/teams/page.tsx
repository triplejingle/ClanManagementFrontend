"use client"
import React from "react";
import {Team, teamSchema} from "@/domain/team";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import RequiredInput from "@/components/input/RequiredTextInput";
import {useRouter} from "next/navigation";
import {FAILURE_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {toast} from "react-toastify";
import CreateFormLayout from "@/components/form/CreateFormLayout";
import {createTeam} from "@/redux/team/teamThunks";


export default function Page({params}: { params: { eventid: number, teamid: number } }) {
    const teamState = useAppSelector((state) => state.reducers.team.status);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toastId = React.useRef(null);

    function onSubmit(newData: Team) {
        toastId.current = toast.info('Saving in progress, please wait...');
        dispatch(createTeam({eventid: params.eventid, team: newData})).then((response: any) => {
                if (teamState == SUCCESS_STATUS) {
                    toast.update(toastId.current, {type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Team created"});
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

    return (<>
        <CreateFormLayout
            title={"Team"}
            description={""}
            onSubmit={onSubmit}
            schema={teamSchema}
            returnUrl={"/events/" + params.eventid}
        >
            <div className={"grid grid-cols-1 bg-gray-700/10 py-10 px-5"}>
                <div className={"flex flex-col space-y-5"}>
                    <RequiredInput label={"Team name"} name={"name"}/>
                </div>
                <div className="mt-6 flex flex-row flex-wrap  gap-x-6 ">

                </div>
            </div>
        </CreateFormLayout>
    </>);
}