import DatePicker from "react-datepicker";
import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import BaseLabel from "@/components/text/BaseLabel";

type  NullableDateTimePickerProps={
    label:string;
    name:string;
}
export default function NullableDateTimePicker({label,name}:NullableDateTimePickerProps){
    const {register,setValue,getValues} = useFormContext();
    const dateTimeData = getValues(name)?new Date(new Date(getValues(name)).setHours(new Date(getValues(name)).getHours()+2)).toUTCString(): new Date(new Date(new Date().setUTCMinutes(0)).setSeconds(0)).toUTCString();
    const [date, setDate] = useState(dateTimeData);

    useEffect(()=>{
        setValue(name, date);
    },[date])

    function getDate(){
        var currentDate = new Date(date);
        //to display the hours correctly
        //When selected 11:00 the component will display 13:00
        currentDate.setHours(currentDate.getHours()-2);
        return currentDate;
    }
    function setDateTime(dateTime: Date){
        var currentDate = new Date(dateTime);
        //hours selected differs by two hours eg selecting 11:00 will result in 09:00
        currentDate.setHours(currentDate.getHours()+2);
        setDate(currentDate.toUTCString())
    }
    return (
        <div>
            <BaseLabel
                label={label}
                name={name}

            />
            <input hidden {...register(name)} className={"text-black"}/>
            <DatePicker
                className={"text-black rounded-md"}
                showIcon={true}
                selected={getDate()}
                onChange={(value :Date) => setDateTime(value)}
                timeFormat="HH:mm"
                showTimeSelect
                dateFormat="yyyy MMMM d,  HH:mm"
            />
        </div>)
}