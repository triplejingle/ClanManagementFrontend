import {combineReducers, configureStore} from "@reduxjs/toolkit";
import eventSlice from "@/redux/event/eventSlice";


const reducers = combineReducers({
    event: eventSlice
})

export const store = configureStore({
        reducer: {
            reducers
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({

                serializableCheck: false,
            }),
    }
)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch