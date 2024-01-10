import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterfaces } from "@/interfaces/product.interface.ts";

interface CartState {
  cartItems: ProductInterfaces[];
  promoCod: number;
}

const initialState: CartState = {
  cartItems: [],
  promoCod: 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ProductInterfaces[]>) => {
      state.cartItems = action.payload;
    },
    setPromoCod: (state, action: PayloadAction<number>) => {
      state.promoCod = action.payload;
    },
  },
});

export const { setCart, setPromoCod } = cartReducer.actions;
export default cartReducer.reducer;
