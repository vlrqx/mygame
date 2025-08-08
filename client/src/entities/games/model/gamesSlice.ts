import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { GamesList } from '@/entities/games/types/shemas';
import { fetchGames } from '@/entities/games/model/gamesThunks';

type GamesState = {
  games: GamesList;
};

const initialState: GamesState = {
  games: [],
};

const slice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<GamesList>) {
      state.games = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.games = action.payload;
    })
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.games = [];
    })
  },
});

export const { setGames } = slice.actions;
export default slice.reducer;