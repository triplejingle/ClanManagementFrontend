import {createEntityAdapter} from "@reduxjs/toolkit";
import {RootState} from "@/redux/clanmanagementstore";
import {Authorization} from "@/domain/Role";

export const authorizationsAdapter = createEntityAdapter<Authorization>({})

export const {selectAll: selectALlAuthorizations} = authorizationsAdapter.getSelectors<RootState>(
    (state: RootState) => state.authorizationSlice
)