import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/reducers/user.reducer";
import CartReducer from "@/redux/reducers/cart.reducer";
import WishListReducer from "@/redux/reducers/wish-list.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: CartReducer,
    wishList: WishListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
