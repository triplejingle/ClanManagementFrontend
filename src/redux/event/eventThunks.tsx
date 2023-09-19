import {createAsyncThunk} from "@reduxjs/toolkit";
import {EventService} from "@/services/EventService";
import {Event} from '@/domain/event'

const eventService = new EventService();
export const createEvent = createAsyncThunk(
    'event/create',
    async (event: Event, thunkApi)=>{
        const response=  await eventService.createEvent(event)

        if(response != null){
            return response;
        }else {
           return thunkApi.rejectWithValue(response)
        }
    }
)
export const fetchEvents = createAsyncThunk(
    'event/fetch',
    async ( )=>{
        return await eventService.fetchEvents()
    }
)

export const updateEvent = createAsyncThunk(
    'event/update',
    async (event:Event, thunkApi) =>{
        var response  = await eventService.updateEvent(event);
        if(response != null){
            return response
        }else{
            return thunkApi.rejectWithValue(response)
        }
    }
)

// export const deleteEvent = createAsyncThunk(
//     'event/delete',
//     async (eventid:number, thunkAPI)=>{
//         const response = await eventService.deleteEvent()
//     }
// )