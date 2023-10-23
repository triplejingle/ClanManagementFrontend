import {createEntityAdapter} from "@reduxjs/toolkit";
import {Event} from "@/domain/event";
import {RootState} from "@/redux/clanmanagementstore";

export const eventsAdapter = createEntityAdapter<Event>({
    // Assume IDs are stored in a field other than `book.id`
    // @ts-ignore
    selectId: (event) => event.eventid,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const {
    selectAll: allEvents,
    selectById: selectEventById
} = eventsAdapter.getSelectors<RootState>(
    (state: RootState) => state.eventSlice
)

