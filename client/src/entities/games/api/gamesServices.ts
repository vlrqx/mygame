import { GamesListSchema } from '@/entities/games/types/shemas';
import { GamesList } from '@/entities/games/types/shemas';
import axiosInstance from '@/shared/api/axiosinstance';

const gameService={
    fetchGames:async ()=>{
        const response=await axiosInstance.get<GamesList>('/posts');
        return response.data;
    },
}

export default gameService;