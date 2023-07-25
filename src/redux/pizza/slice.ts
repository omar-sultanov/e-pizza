import { IPizza, IPizzaInitialState, ISearchParams } from '@models/Pizza';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'redux/store';
import { fetchPizzas } from './asyncAction';

export enum Status{
  LOADING='loading',
  SUCCESS='success',
  ERROR='error'
}


const initialState:IPizzaInitialState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers:(builder) => {
    builder.addCase(
      fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
      })
    
      builder.addCase(
        fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
      })

      builder.addCase(
        fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
        }) 
  }
});


// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
