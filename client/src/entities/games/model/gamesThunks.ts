import { createAsyncThunk } from '@reduxjs/toolkit';
import gameService from '@/entities/games/api/gamesServices';


export const fetchGames = createAsyncThunk('games/fetchGames', async ()=>{
    const games=await gameService.fetchGames();
    return games;
});