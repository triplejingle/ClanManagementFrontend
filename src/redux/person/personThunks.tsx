import {createAsyncThunk} from "@reduxjs/toolkit";
import {People} from "@/domain/people";
import {PersonService} from "@/services/PersonService";

const personService = new PersonService();
interface fetchPersonProps{
    eventid: number;

}
export const fetchPersons = createAsyncThunk(
    'persons/fetch',
    async (data:fetchPersonProps, thunkAPI) => {
        const response = await personService.fetchPersons(data.eventid);

        if (response) {
            return response;
        } else {
            return thunkAPI.rejectWithValue(response);
        }
    }
)
interface createPersonProps{
    teamid: number;
    person:People;
}
export const createPerson = createAsyncThunk(
    "persons/create",
    async (data:createPersonProps, {rejectWithValue})=>{
        const response = await personService.createPerson(data.teamid,data.person);
        console.log(response)
        console.log("created")
        if(response != null){
            return response;
        }else{
            return rejectWithValue(response);
        }
    }
)

export const deletePerson = createAsyncThunk(
    "persons/delete",
    async (id: number, {rejectWithValue})=>{
        const response = await personService.deletePerson(id);
        if(response != null){
            return response;
        }else{
            return rejectWithValue(response)
        }
    }
)