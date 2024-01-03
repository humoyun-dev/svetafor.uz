import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterfaces } from "@/interfaces/user/user.interfaces";

interface UserState {
  userData: UserInterfaces[];
  token: string;
}

const initialState: UserState = {
  userData: [],
  token: "",
};

const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any[]>) => {
      state.userData = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, setToken } = userReducer.actions;
export default userReducer.reducer;
