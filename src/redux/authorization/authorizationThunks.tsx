import {createAsyncThunk} from "@reduxjs/toolkit";

import {AuthorizationService} from "@/services/AuthorizationService";

const authorizationService = new AuthorizationService();
export const fetchAuthorization = createAsyncThunk(
    'authorization/fetch',
    async (userId: string, {rejectWithValue})=>{
        const response=  await authorizationService.fetchAuthorization(userId)
        if(response != null){
            return response;
        }else {
           return rejectWithValue(response)
        }
    }
)