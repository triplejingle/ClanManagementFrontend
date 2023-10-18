"use client"
import React from "react";
import {Team, teamSchema} from "@/domain/team";
import {useAppDispatch} from "@/hooks/hooks";
import RequiredInput from "@/components/input/RequiredTextInput";
import {useRouter} from "next/navigation";
import CreateFormLayout from "@/components/form/CreateFormLayout";
import {createTeam} from "@/redux/team/teamThunks";
import {ErrorToast, IdleToast, SuccessToast} from "@/components/toast/SuccessToast";


export default function Page({params}: { params: { eventid: number, teamid: number } }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toastId: any = React.useRef();

    function onSubmit(newData: Team) {
        IdleToast({toastId: toastId});
        dispatch(createTeam({eventid: params.eventid, team: newData})).then((test) => {
            if (createTeam.fulfilled.type == test.type) {
                SuccessToast({
                    toastId: toastId,
                    message: "Team created"
                });
                router.push("/events/" + params.eventid)
            }
            if (createTeam.rejected.type == test.type) {
                ErrorToast({
                    toastId: toastId,
                    message: "Cannot create team."
                });
            }
        })
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
            </div>
        </CreateFormLayout>
    </>);
}