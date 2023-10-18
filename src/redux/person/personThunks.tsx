import {createAsyncThunk} from "@reduxjs/toolkit";
import {People} from "@/domain/people";
import {PersonService} from "@/services/PersonService";

const personService = new PersonService();
interface fetchPersonProps{
    eventid: number;

}
export const fetchPersons = createAsyncThunk(
    'persons/fetch',
    async (data:fetchPersonProps, {rejectWithValue}) => {
        try {
            var response = await personService.fetchPersons(data.eventid);
            return response
        } catch (e) {
            return rejectWithValue(e);
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
        try {
            const response = await personService.createPerson(data.teamid,data.person);
            return response
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const deletePerson = createAsyncThunk(
    "persons/delete",
    async (id: number, {rejectWithValue})=>{
        try {
            const response = await personService.deletePerson(id);
            return response
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)