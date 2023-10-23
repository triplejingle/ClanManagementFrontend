import {combineReducers, configureStore} from "@reduxjs/toolkit";
import eventSlice from "@/redux/event/eventSlice";
import teamSlice from "@/redux/team/teamSlice";
import personSlice from "@/redux/person/personSlice";
import authorizationSlice from "@/redux/authorization/authorizationSlice";


const reducers = combineReducers({
    eventSlice,
    teamSlice,
    personSlice,
    authorizationSlice
})

export const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    }
)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch