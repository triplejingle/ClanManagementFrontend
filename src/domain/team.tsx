import * as yup from "yup";
import {InferType, number, string} from "yup";

export const teamSchema = yup.object({
    name: string().required(),
    teamid: number().nullable(),
    eventid: number().nullable()
})

export type Team = InferType<typeof teamSchema>