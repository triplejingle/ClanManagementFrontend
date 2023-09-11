import DatePicker from "react-datepicker";
import React, {useState} from "react";
import {useFormContext} from "react-hook-form";
import BaseLabel from "@/components/text/BaseLabel";

type  NullableDateTimePickerProps={
    label:string;
    name:string;
}
export default function NullableDateTimePicker({label,name}:NullableDateTimePickerProps){
    const [date, setDate] = useState(new Date());
    const {register} = useFormContext();

    return (
        <div>
            <BaseLabel
                label={label}
                name={name}
            />
            <input hidden {...register(name)} value={date?date.toLocaleString(): new Date().toLocaleString()}/>
            <DatePicker
                className={"text-black rounded-md"}
                showIcon={true}
                selected={date}
                onChange={(value :Date) => setDate(value)}
                timeFormat="HH:mm"
                showTimeSelect
                dateFormat="MMMM d, yyyy HH:mm"
            />
        </div>)
}