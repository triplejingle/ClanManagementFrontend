import {createAsyncThunk} from "@reduxjs/toolkit";

import {AuthorizationService} from "@/services/AuthorizationService";

const authorizationService = new AuthorizationService();
export const fetchAuthorization = createAsyncThunk(
    'authorization/fetch',
    async (userId: string, {rejectWithValue})=>{
        try {
            const response=  await authorizationService.fetchAuthorization(userId)
            return response
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)