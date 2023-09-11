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
    async (customerId:string, thunkApi)=>{
        const response = await eventService.fetchEvents(customerId);

        if(response!=null){
            return response
        }else{
            return thunkApi.rejectWithValue(response)
        }
    }
)
// export const fetchEvent = createAsyncThunk(
//     'event/fetch',
//     async (event: Event, thunkAPI)=>{
//         const response =  await eventService.fetchEvent()
//     }
// )
// export const editEvent = createAsyncThunk(
//     'event/[edit]',
//     async (event: Event, thunkAPI=>{
//         const response = await eventService.editEvent(event);
//     })
// )
