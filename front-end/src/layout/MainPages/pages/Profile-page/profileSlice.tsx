import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
  address: string;
  account_login: boolean;
}

const initialState: ProfileState = {
  account_login: false,
  address: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    log_in: (state, action: PayloadAction<string>) => {
      state.account_login = true;
      state.address = action.payload;
    },
    log_out: (state) => {
      state.account_login = false;
      state.address = "";
    },
  },
});

export const { log_in, log_out } = profileSlice.actions;

export default profileSlice.reducer;
