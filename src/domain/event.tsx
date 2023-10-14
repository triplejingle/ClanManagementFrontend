import * as yup from "yup";
import {date, InferType} from "yup";

export  const eventSchema = yup.object({
    eventcode: yup.string().nullable().default(""),
    startdate: date().nullable(),
    enddate: date().nullable(),
    name: yup.string().required(),
    eventid: yup.number().transform((value) => Number.isNaN(value) ? null : value ).nullable()
})

export type Event = InferType<typeof eventSchema>