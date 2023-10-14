import {createSlice} from "@reduxjs/toolkit";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {Team} from "@/domain/team";
import {fetchEvents} from "@/redux/event/eventThunks";
import {createTeam, deleteTeam, fetchTeams, updateTeam} from "@/redux/team/teamThunks";
import {act} from "react-dom/test-utils";

interface TeamState {
    status: string;
    teams: Team[]
}

const initialState: TeamState = {
    status: IDLE_STATUS,
    teams: []
}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTeam.fulfilled, (state, action)=>{
            state.status = SUCCESS_STATUS;
            state.teams = [action.payload, ...state.teams];
        })
        builder.addCase(createTeam.pending, (state, action)=>{
            state.status = LOADING_STATUS;
        })
        builder.addCase(createTeam.rejected, (state, action)=>{
            state.status = FAILURE_STATUS;
        })
        builder.addCase(fetchTeams.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            state.teams = action.payload;
        })
        builder.addCase(fetchTeams.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchTeams.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })

        builder.addCase(updateTeam.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            const newTeams = state.teams.filter(t=>t.teamid!=action.payload.teamid);
            state.teams = [action.payload,...newTeams];
        })
        builder.addCase(updateTeam.pending, (state, action)=>{
            state.status = LOADING_STATUS;
        })
        builder.addCase(updateTeam.rejected, (state, action)=>{
            state.status= FAILURE_STATUS;
        })
        builder.addCase(deleteTeam.fulfilled, (state, action)=>{
            state.status = SUCCESS_STATUS;
            state.teams=state.teams.filter(t=>t.teamid!=action.payload);
        })
        builder.addCase(deleteTeam.pending, (state, action)=>{
            state.status = LOADING_STATUS;
        })
        builder.addCase(deleteTeam.rejected, (state, action)=>{
            state.status = FAILURE_STATUS;
        })
    }
})


export default teamSlice.reducer