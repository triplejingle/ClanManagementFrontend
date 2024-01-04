import {createEntityAdapter, IdSelector} from "@reduxjs/toolkit";
import {RootState} from "@/redux/clanmanagementstore";
import {People} from "@/domain/people";

export const personsAdapter = createEntityAdapter<People>({
    selectId: (people: People) => people.personid!
})

export const {
    selectAll: selectAllPersons,
    selectById: selectPersonById
} = personsAdapter.getSelectors<RootState>(
    (state: RootState) => state.personSlice
)