import { RootState } from "redux/store";

//selectors
export const selectSort = (state:RootState) => state.filter.sort
export const selectFilter =(state:RootState)=>state.filter

