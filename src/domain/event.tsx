import * as yup from "yup";
import {date, InferType} from "yup";

export  const eventSchema = yup.object().shape({
    eventcode: yup.string().nullable().default(""),
    startdate: date().required(),
    enddate: date().required(),
    name: yup.string().required(),
    eventid: yup.number().nullable()
})

export type Event = InferType<typeof eventSchema>