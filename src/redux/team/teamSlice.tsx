import {createSlice, Update} from "@reduxjs/toolkit";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {Team} from "@/domain/team";
import {createTeam, deleteTeam, fetchTeams, updateTeam} from "@/redux/team/teamThunks";
import {teamsAdapter} from "@/redux/team/teamAdapter";

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
    initialState: teamsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTeam.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            teamsAdapter.addOne(state, action.payload);
        })
        builder.addCase(createTeam.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(createTeam.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(fetchTeams.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            teamsAdapter.addMany(state, action.payload);
        })
        builder.addCase(fetchTeams.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchTeams.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })

        builder.addCase(updateTeam.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            state.status = SUCCESS_STATUS;
            const updateSubmission: Update<Team> = {
                id: action.payload.teamid,
                changes: {...action.payload}
            }
            delete updateSubmission.changes.teamid;
            teamsAdapter.updateOne(state, updateSubmission);
        })
        builder.addCase(updateTeam.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(updateTeam.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
        builder.addCase(deleteTeam.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            teamsAdapter.removeOne(state, action.payload);
        })
        builder.addCase(deleteTeam.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(deleteTeam.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
    }
})


export default teamSlice.reducer