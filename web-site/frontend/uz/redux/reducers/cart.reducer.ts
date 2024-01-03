import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

interface CartState {
  cartItems: ProductInterfaces[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ProductInterfaces[]>) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart } = cartReducer.actions;
export default cartReducer.reducer;
