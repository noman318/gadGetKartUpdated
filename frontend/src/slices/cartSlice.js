import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartutils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems?.find((cart) => cart?._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems?.map((cart) =>
          cart._id === existItem._id ? item : cart
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Item Price
      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
