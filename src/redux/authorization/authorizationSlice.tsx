import {createSlice} from "@reduxjs/toolkit";
import {FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS} from "@/redux/stateStatus";
import {fetchAuthorization} from "@/redux/authorization/authorizationThunks";
import {Authorization} from "@/domain/role";
import {authorizationsAdapter} from "@/redux/authorization/authorizationAdapter";


interface AuthorizationState {
    status: string;
    roles: Authorization[]
}

const initialState: AuthorizationState = {
    status: IDLE_STATUS,
    roles: []
}

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: authorizationsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAuthorization.fulfilled, (state, action) => {
            state.status = SUCCESS_STATUS;
            authorizationsAdapter.addMany(state, action.payload)
        })
        builder.addCase(fetchAuthorization.pending, (state, action) => {
            state.status = LOADING_STATUS;
        })
        builder.addCase(fetchAuthorization.rejected, (state, action) => {
            state.status = FAILURE_STATUS;
        })
    }
})

export default authorizationSlice.reducer
