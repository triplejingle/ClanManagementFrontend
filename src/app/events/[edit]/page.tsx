'use client'

import 'moment/locale/de';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import NullableDateTimePicker from "@/components/input/NullableDateTimePicker";
import NullableTextInput from "@/components/input/NullableTextInput";
import RequiredInput from "@/components/input/RequiredTextInput";

export default function Page() {

    return (
        <div>
            <RequiredInput
                label={"Event name"}
                name={"name"}
            />
            <NullableTextInput
                label={"Event code"}
                description={"The code to join the event. Send this code to the participants."}
                name={"eventcode"}
            />
            <div className="mt-6 flex flex-row flex-wrap mx-auto gap-x-6">
                <NullableDateTimePicker
                    label={"Start Date/time"}
                    name={"startdate"}
                />
                <NullableDateTimePicker
                    label={"End Date/time"}
                    name={"enddate"}
                />
            </div>
        </div>
    )
}