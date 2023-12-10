import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export interface FilterState {
  square: {
    min: string;
    max: string;
  };
  price: {
    min: string;
    max: string;
  };
  active_filter: string[];
  sortBy: string;
  orderBy: string;
  active: Boolean;
}

const initialState: FilterState = {
  square: {
    min: "",
    max: "",
  },
  price: {
    min: "",
    max: "",
  },
  active_filter: [],
  orderBy: "highest",
  sortBy: "price",
  active: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    set_square_min: (state, action: PayloadAction<string>) => {
      state.square.min = action.payload.replace(/[^0-9]/g, "");
    },
    set_square_max: (state, action: PayloadAction<string>) => {
      state.square.max = action.payload.replace(/[^0-9]/g, "");
    },
    set_price_min: (state, action: PayloadAction<string>) => {
      state.price.min = action.payload.replace(/[^0-9]/g, "");
    },
    set_price_max: (state, action: PayloadAction<string>) => {
      state.price.max = action.payload.replace(/[^0-9]/g, "");
    },
    clear_all: (state) => {
      state.price.max = "";
      state.price.min = "";
      state.square.max = "";
      state.square.min = "";
      state.active_filter = [];
    },
    set_sort: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    set_active: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    set_order: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
  },
});

export const {
  set_square_min,
  set_square_max,
  set_price_min,
  set_price_max,
  clear_all,
  set_sort, set_active, set_order

} = filterSlice.actions;

export default filterSlice.reducer;
