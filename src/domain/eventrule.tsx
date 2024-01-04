import * as yup from "yup";
import {InferType} from "yup";

export const eventruleSchema = yup.object({
    eventruleid: yup.number().required(),
    type: yup.string().required(),
    description: yup.string().required(),
    name: yup.string().required(),
    enabled: yup.bool().required(),
    iseditable: yup.bool().required()
})

export type Eventrule = InferType<typeof eventruleSchema>;