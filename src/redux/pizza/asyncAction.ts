import { IPizza, ISearchParams } from "@models/Pizza";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<IPizza[],ISearchParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
      const { category, order, sortBy, currentPage } = params;
  
      const { data } = await axios.get(
        `https://63f9462c473885d837cbf5ac.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
      );  
      return data;
    },
  );
  