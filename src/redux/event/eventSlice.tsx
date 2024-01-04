import {createSlice, Update} from "@reduxjs/toolkit";

import {createEvent, deleteEvent, fetchEvents, updateEvent} from "@/redux/event/eventThunks";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {Event} from '@/domain/event'
import {eventsAdapter} from "@/redux/event/eventAdapter";

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
    initialState: eventsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            eventsAdapter.addOne(state, action.payload)
        })
        builder.addCase(createEvent.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(createEvent.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS
            // state.events = action.payload;
            eventsAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchEvents.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(updateEvent.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            const updateSubmission: Update<Event> = {
                id: action.payload.eventid!,
                changes: {...action.payload}
            }
            delete updateSubmission.changes.eventid;
            eventsAdapter.updateOne(state, updateSubmission)
        })
        builder.addCase(updateEvent.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(updateEvent.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            eventsAdapter.removeOne(state, action.payload);
        })
        builder.addCase(deleteEvent.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(deleteEvent.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
    }
})

export default eventSlice.reducer
