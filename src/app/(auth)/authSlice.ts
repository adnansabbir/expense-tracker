import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  email: string | undefined;
  name?: string | undefined;
};

type AuthState = {
  status: "unknown" | "signedOut" | "signedIn";
  user: AuthUser | null;
};

const initialState: AuthState = {
  status: "unknown",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(
      state,
      action: PayloadAction<{ status: AuthState["status"]; user: AuthUser | null }>
    ) {
      state.status = action.payload.status;
      state.user = action.payload.user;
    },
    clearAuthState(state) {
      state.status = "signedOut";
      state.user = null;
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
