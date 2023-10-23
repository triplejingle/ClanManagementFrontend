import * as yup from "yup";
import {InferType, number, string} from "yup";

export const authorizationSchema = yup.object({
    id: string().nullable(),
    name: string().nullable(),
    description: number().nullable()
})

export type Authorization = InferType<typeof authorizationSchema>