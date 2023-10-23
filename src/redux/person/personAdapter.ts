import {createEntityAdapter} from "@reduxjs/toolkit";
import {RootState} from "@/redux/clanmanagementstore";
import {People} from "@/domain/people";

export const personsAdapter = createEntityAdapter<People>({
    // @ts-ignore
    selectId: (people) => people.personid
})

export const {
    selectAll: selectAllPersons,
    selectById: selectPersonById
} = personsAdapter.getSelectors<RootState>(
    (state: RootState) => state.personSlice
)