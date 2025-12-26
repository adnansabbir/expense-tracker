import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  isSyncing: boolean;
  lastSyncAt: string | null;
};

const initialState: AppState = {
  isSyncing: false,
  lastSyncAt: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSyncing(state, action: PayloadAction<boolean>) {
      state.isSyncing = action.payload;
    },
    setLastSyncAt(state, action: PayloadAction<string | null>) {
      state.lastSyncAt = action.payload;
    },
    resetAppState() {
      return initialState;
    },
  },
});

export const { setSyncing, setLastSyncAt, resetAppState } = appSlice.actions;
export default appSlice.reducer;
