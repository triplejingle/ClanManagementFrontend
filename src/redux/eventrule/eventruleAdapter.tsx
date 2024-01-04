import {createEntityAdapter} from "@reduxjs/toolkit";
import {Eventrule} from "@/domain/eventrule";
import {RootState} from "@/redux/clanmanagementstore";

export const eventruleAdapter = createEntityAdapter<Eventrule>({
    selectId: state=>state.eventruleid
})
export const {selectById}= eventruleAdapter.getSelectors<RootState>(state=>state.eventRuleSlice);
