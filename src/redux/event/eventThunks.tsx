import {createAsyncThunk} from "@reduxjs/toolkit";
import {EventService} from "@/services/EventService";
import {Event} from '@/domain/event'

const eventService = new EventService();
export const createEvent = createAsyncThunk(
    'event/create',
    async (event: Event, {rejectWithValue}) => {
        try {
            var response = await eventService.createEvent(event);
            return response
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)
export const fetchEvents = createAsyncThunk(
    'event/fetch',
    async () => {
        return await eventService.fetchEvents()
    }
)

export const updateEvent = createAsyncThunk(
    'event/update',
    async (event: Event, {rejectWithValue}) => {
        try {
            return await eventService.updateEvent(event);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const deleteEvent = createAsyncThunk(
    'event/delete',
    async (eventId: number, {rejectWithValue}) => {
        try {
            return await eventService.deleteEvent(eventId);
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)