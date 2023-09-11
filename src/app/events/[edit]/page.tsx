'use client'

import 'moment/locale/de';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import NullableDateTimePicker from "@/components/input/NullableDateTimePicker";
import NullableInput from "@/components/input/NullableInput";
import RequiredInput from "@/components/input/RequiredInput";

export default function Page() {

    return (
        <div>
            <RequiredInput
                label={"Event name"}
                name={"name"}
            />
            <NullableInput
                label={"Event code"}
                description={"The code to join the event. Send this code to the participants."}
                name={"eventcode"}
            />
            <div className="mt-6 flex flex-row flex-wrap mx-auto gap-x-6">
                <NullableDateTimePicker
                    label={"Start Date/time"}
                    name={"startDate"}
                />
                <NullableDateTimePicker
                    label={"End Date/time"}
                    name={"endDate"}
                />
            </div>
        </div>
    )
}