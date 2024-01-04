import {createSlice} from "@reduxjs/toolkit";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {People} from "@/domain/people";
import {createPerson, deletePerson, fetchPersons} from "@/redux/person/personThunks";
import {personsAdapter} from "@/redux/person/personAdapter";

interface PersonState {
    status: string;
    people: People[]
}

const initialState: PersonState = {
    status: IDLE_STATUS,
    people: []
}

export const personSlice = createSlice({
    name: 'person',
    initialState: personsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPersons.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            personsAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchPersons.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchPersons.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })

        builder.addCase(createPerson.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            personsAdapter.addOne(state, action.payload)
        })
        builder.addCase(createPerson.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(createPerson.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })

        builder.addCase(deletePerson.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            personsAdapter.removeOne(state, action.payload)
        })
        builder.addCase(deletePerson.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(deletePerson.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
    }
})

export default personSlice.reducer