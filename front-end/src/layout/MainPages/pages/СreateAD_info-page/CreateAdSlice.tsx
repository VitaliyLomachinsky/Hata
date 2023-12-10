import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CreateAdState {
  location: string;
  area: string;
  description: string;

  price: string;
  period: string;
  currency: string;

  preview_image: File | null;
  all_images: File[];

  preview_CID: string;
  image_folder_CID: string;
}

const initialState: CreateAdState = {
  location: "",
  area: "",
  description: "",

  price: "",
  currency: "ETH",
  period: "month",

  preview_image: null,
  all_images: [],

  preview_CID: "",
  image_folder_CID: "",
};

export const createAdSlice = createSlice({
  name: "createAd",
  initialState,
  reducers: {
    set_location: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    set_area: (state, action: PayloadAction<string>) => {

      state.area = action.payload;
    },
    set_price: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    set_period: (state, action: PayloadAction<string>) => {
      state.period = action.payload;
    },
    set_currency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },

    set_description: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },

    set_preview: (state, action: PayloadAction<File>) => {
      state.preview_image = action.payload;
    },

    add_image: (state, action: PayloadAction<File>) => {
      console.log(state.all_images.includes(action.payload));

      if (state.preview_image == null) {
        state.preview_image = action.payload;
      }
      state.all_images.push(action.payload);
    },

    remove_image: (state, action: PayloadAction<number>) => {
      if (state.all_images[action.payload] == state.preview_image) {
        state.all_images.splice(action.payload, 1);

        if (state.all_images.length > 0) {
          state.preview_image = state.all_images[0];
        } else {
          state.preview_image = null;
        }
      } else {
        state.all_images.splice(action.payload, 1);
      }
    },

    set_preview_CID: (state, action: PayloadAction<string>) => {
      state.preview_CID = action.payload;
    },

    set_folder_CID: (state, action: PayloadAction<string>) => {

      state.image_folder_CID = action.payload;
    },
  },
});

export const {
  set_location,
  set_area,
  set_price,
  set_period,
  set_currency,
  set_description,
  set_preview,
  add_image,
  remove_image,
  set_preview_CID,
  set_folder_CID
} = createAdSlice.actions;

export default createAdSlice.reducer;
