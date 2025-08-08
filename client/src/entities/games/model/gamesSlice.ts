import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GamesList } from "@/entities/games/types/shemas";
import { fetchGames } from "@/entities/games/model/gamesThunks";
import { set } from "date-fns";
import { number } from "zod";

type GamesState = {
  games: GamesList;
  isModal: boolean;
  question: {
    id?: number;
    name?: string;
    points?: number;
    answer?: string;
  };
  timerId: NodeJS.Timeout | null;
  answer: string;
  isCorrecctAnswer: boolean | null;
};

const initialState: GamesState = {
  games: [],
  isModal: false,
  question: { id: null, name: "", points: null, answer: "" },
  timerId: null,
  answer: "",
  isCorrecctAnswer: null,
};

const slice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<GamesList>) {
      state.games = action.payload;
    },

    setIsModal(state, action: PayloadAction<boolean>) {
      state.isModal = !state.isModal;
    },

    setModalFalse(state) {
      state.isModal = false;
    },

    setQuestion(
      state,
      action: PayloadAction<{
        id?: number;
        name?: string;
        points?: number;
        answer?: string;
      }>
    ) {
      state.question = action.payload;
    },

    setTimerId(state, action: PayloadAction<NodeJS.Timeout | null>) {
      state.timerId = action.payload;
    },

    setAnswer(state, action: PayloadAction<string>) {
      state.answer = action.payload;
    },

    isCorrecctAnswer(state, action: PayloadAction<boolean | null>) {
      state.isCorrecctAnswer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.games = action.payload;
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.games = [];
    });
  },
});

export const {
  setGames,
  setIsModal,
  setModalFalse,
  setQuestion,
  setTimerId,
  setAnswer,
  isCorrecctAnswer,
} = slice.actions;
export default slice.reducer;
