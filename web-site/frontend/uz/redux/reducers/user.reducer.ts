import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterfaces } from "@/interfaces/user/user.interfaces";
import { OrderInterface } from "@/interfaces/order/order.interface";

interface UserState {
  userData: UserInterfaces;
  token: string;
}

const initialState: UserState = {
  userData: {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    address: "",
    passport: "",
    orders: [],
    profile_image: null,
  },
  token: "",
};

const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserInterfaces>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    setOrders: (state, action: PayloadAction<OrderInterface[]>) => {
      state.userData.orders = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, setOrders, setToken } = userReducer.actions;
export default userReducer.reducer;
