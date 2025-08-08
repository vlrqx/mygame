import { createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "@/entities/games/api/gamesServices";
import { AppDispatch, RootState } from "@/app/store";
import { closeQuestion, setGamesWithClosed } from "./gamesSlice";

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const games = await gameService.fetchGames();
  return games;
});

const LOCAL_STORAGE_KEY = "myGameThemesWithStatus";

export const loadGamesWithLocalStorage =
  () => async (dispatch: AppDispatch) => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      dispatch(setGamesWithClosed(JSON.parse(storedData)));
    } else {
      const gamesFromApi = await gameService.fetchGames();
      // Добавляем поле isClosed=false у каждого вопроса
      const gamesWithFlag = gamesFromApi.map((theme) => ({
        ...theme,
        Questions: theme.Questions.map((q) => ({ ...q, isClosed: false })),
      }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gamesWithFlag));
      dispatch(setGamesWithClosed(gamesWithFlag));
    }
  };

export const closeQuestionAndSave =
  (themeId: number, questionId: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(closeQuestion({ themeId, questionId }));
    const { games } = getState().games;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));
  };

export const resetGameAndStorage =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { games } = getState().games;

    const resetGames = games.map((theme) => ({
      ...theme,
      Questions: theme.Questions.map((q) => ({ ...q, isClosed: false })),
    }));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resetGames));
    dispatch(setGamesWithClosed(resetGames));
  };
