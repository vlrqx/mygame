import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

const LS_KEY = "moya-igra-user";

export type UserState = {
  user: User | null;
};

const readFromLS = (): User | null => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  user: readFromLS(),
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      reducer(state, action: PayloadAction<User>) {
        state.user = action.payload;
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(action.payload));
        } catch {
          // ignore
        }
      },
      prepare(name: string) {
        return { payload: { id: crypto.randomUUID(), name } as User };
      },
    },
    logout(state) {
      state.user = null;
      try {
        localStorage.removeItem(LS_KEY);
      } catch {
        // ignore
      }
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = slice.actions;
export default slice.reducer;
