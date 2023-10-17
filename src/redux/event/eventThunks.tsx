import {createAsyncThunk} from "@reduxjs/toolkit";
import {EventService} from "@/services/EventService";
import {Event} from '@/domain/event'
import {number} from "yup";

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

export const deleteEvent = createAsyncThunk(
    'event/delete',
    async (eventId:number, thunkAPI)=>{
        const response = await eventService.deleteEvent(eventId);
        console.log(response)
        if(response != null){
            console.log(response)
            return response
        }else{
            console.log("caching"+ response)
            return thunkAPI.rejectWithValue(response);
        }
    }
)