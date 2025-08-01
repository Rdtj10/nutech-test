import { createSlice } from "@reduxjs/toolkit";
import type { IProfile } from "../schema/profile";

interface UserState {
  profile: IProfile | null;
  isLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.profile = action.payload;
      state.isLoading = false;
    },
    clearUser(state) {
      state.profile = {
        email: "",
        first_name: "",
        last_name: "",
        profile_image: "",
      };
      state.isLoading = true;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
