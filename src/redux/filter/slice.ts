import { IFilterInitialState, ISort, SortProperty } from '../../models/Filter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFilterInitialState = {
  searchValue:'',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortProperty.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,

  reducers: {
    setSearchValue(state, action:PayloadAction<string>){
      state.searchValue = action.payload
    },
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action:PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action:PayloadAction<IFilterInitialState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortProperty.RATING_DESC,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
