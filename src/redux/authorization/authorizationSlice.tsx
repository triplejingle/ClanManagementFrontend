import {createSlice} from "@reduxjs/toolkit";

import {createEvent, deleteEvent, fetchEvents, updateEvent} from "@/redux/event/eventThunks";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {Event} from '@/domain/event'

import React from "react";
import {fetchAuthorization} from "@/redux/authorization/authorizationThunks";
import {Authorization} from "@/domain/Role";


interface AuthorizationState {
    status: string;
    roles: Authorization[]
}

const initialState: AuthorizationState = {
    status: IDLE_STATUS,
    roles: []
}

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthorization.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            state.roles = [... action.payload];
        })
        builder.addCase(fetchAuthorization.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchAuthorization.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
    }
})

export default authorizationSlice.reducer
