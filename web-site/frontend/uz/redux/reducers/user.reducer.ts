import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any[]; // Replace 'any' with a more specific type if possible
  token: string;
  message: string; // Corrected from 'massage' to 'message'
}

const initialState: UserState = {
  userData: [],
  token: "",
  message: "",
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
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setUserData, setMessage, setToken } = userReducer.actions;
export default userReducer.reducer;
