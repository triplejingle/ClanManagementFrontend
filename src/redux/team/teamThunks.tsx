import {createAsyncThunk} from "@reduxjs/toolkit";
import {TeamService} from "@/services/TeamService";
import {Team} from "@/domain/team";

const teamService = new TeamService();
export const fetchTeams = createAsyncThunk(
    'teams/fetch',
    async (data, thunkAPI) => {
        const response = await teamService.fetchTeams();
        if (response) {
            return response;
        } else {
            return thunkAPI.rejectWithValue(response);
        }
    }
)
interface createTeamProps{
    eventid: number;
    team:Team;
}
export const createTeam = createAsyncThunk(
    "teams/create",
    async (data:createTeamProps, {rejectWithValue})=>{
        const response = await teamService.createTeam(data.eventid,data.team);
        if(response != null&&response.code==null){
            return response;
        }else{
            return rejectWithValue(response);
        }
    }
)


export const updateTeam = createAsyncThunk(
    "teams/update",
    async (data: Team, thunkAPI) => {
        let newTeam = {...data} as Team;

        const response = await teamService.updateTeam(data.teamid as number,newTeam);
        if(response != null&&response.code==null){
            return response;
        } else {
            return thunkAPI.rejectWithValue(response);
        }
    }
)

export const deleteTeam = createAsyncThunk(
    "teams/delete",
    async (id: number, {rejectWithValue})=>{
        const response = await teamService.deleteTeam(id);
        if(response != null&&response.code==null){
            return response;
        }else{
            return rejectWithValue(response)
        }
    }
)