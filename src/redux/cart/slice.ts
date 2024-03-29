import { ICartInitialState, ICartItem } from 'models/CartItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { calcTotalPrice } from 'utils/calcTotalPrice';
import { getItemsFromFS } from 'utils/getItemsFromLS';



const initialState:ICartInitialState = getItemsFromFS()

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem(state, action:PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice =calcTotalPrice(state.items)
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice=0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
