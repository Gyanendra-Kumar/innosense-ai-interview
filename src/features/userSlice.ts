import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types";

interface UserState {
  user: UserType | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
