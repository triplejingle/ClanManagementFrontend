import * as yup from "yup";
import {InferType, number, string} from "yup";

export const peopleSchema = yup.object({
    name: string().required(),
    teamid: number().nullable(),
    personid: number().nullable()
})

export type People = InferType<typeof peopleSchema>