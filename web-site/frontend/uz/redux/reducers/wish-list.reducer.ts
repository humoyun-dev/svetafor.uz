import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterfaces } from "@/interfaces/product/product.interfaces";

interface WishListState {
  wishItems: ProductInterfaces[];
}

const initialState: WishListState = {
  wishItems: [],
};

const WishListReducer = createSlice({
  name: "wishList",
  initialState: initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<ProductInterfaces[]>) => {
      state.wishItems = action.payload;
    },
  },
});

export const { setWishList } = WishListReducer.actions;
export default WishListReducer.reducer;
