import {createSlice} from "@reduxjs/toolkit";

import {createEvent, fetchEvents, updateEvent} from "@/redux/event/eventThunks";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {Event} from '@/domain/event'

interface EventState {
    status: string;
    events: Event[]
}

const initialState: EventState = {
    status: IDLE_STATUS,
    events: []
}
export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            state.events = [...state.events, action.payload];
        })
        builder.addCase(createEvent.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(createEvent.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS
            state.events = action.payload;
        })
        builder.addCase(fetchEvents.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(updateEvent.fulfilled, (state, action) => {
            const updatedEvent = action.payload;
            console.log("updated event", updatedEvent)
            state.status = SUCCESS_STATUS;
            var newEvents = state.events.filter(event => event.eventid != updatedEvent.eventid);
            state.events = [...newEvents, updatedEvent]
        })
        builder.addCase(updateEvent.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(updateEvent.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
    }
})


export default eventSlice.reducer
