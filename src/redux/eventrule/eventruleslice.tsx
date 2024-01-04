import {createSlice} from "@reduxjs/toolkit";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {People} from "@/domain/people";
import {createPerson, deletePerson, fetchPersons} from "@/redux/person/personThunks";
import {personsAdapter} from "@/redux/person/personAdapter";
import {eventruleAdapter} from "@/redux/eventrule/eventruleAdapter";
import {Eventrule} from "@/domain/eventrule";

interface EventRuleState{
    status:string;
    eventRules: Eventrule[];
}

const initialState: EventRuleState={
    status: IDLE_STATUS,
    eventRules: []
}

export const eventRuleSlice = createSlice({
    name:"eventrule",
    initialState: eventruleAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder)=>{

    }
})

export default eventRuleSlice.reducer;