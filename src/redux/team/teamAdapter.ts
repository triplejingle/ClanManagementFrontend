import {createEntityAdapter} from "@reduxjs/toolkit";
import {RootState} from "@/redux/clanmanagementstore";
import {Team} from "@/domain/team";

export const teamsAdapter = createEntityAdapter<Team>({
    // Assume IDs are stored in a field other than `book.id`
    // @ts-ignore
    selectId: (team) => team.teamid,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const {
    selectAll: selectAllTeams,
    selectById: selectTeamById
} = teamsAdapter.getSelectors<RootState>(
    (state: RootState) => state.teamSlice
)

