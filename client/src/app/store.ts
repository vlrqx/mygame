import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import gamesReducer from "@/entities/games/model/gamesSlice";
import userReducer from '@/entities/user/model/userSlice'

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
