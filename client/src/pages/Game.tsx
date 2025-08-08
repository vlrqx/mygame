import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import {
  setGames,
  setIsModal,
  setModalFalse,
  setQuestion,
  setTimerId,
} from "@/entities/games/model/gamesSlice";
import { fetchGames } from "@/entities/games/model/gamesThunks";
import QuestionModal from "@/features/Question/ui/QuestionModal";
import { set } from "date-fns";
import AnswerFeedback from "@/features/Question/ui/Feedback";
import {
  loadGamesWithLocalStorage,
  closeQuestionAndSave,
  resetGameAndStorage,
} from "@/entities/games/model/gamesThunks";

const Game = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { games, isModal } = useAppSelector((state) => state.games);

  useEffect(() => {
    void dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    // Загрузка с localStorage или API
    void dispatch(loadGamesWithLocalStorage());
  }, [dispatch]);

  const handleQuestionClick = (
    themeId: number,
    questionId: number,
    question
  ) => {
    dispatch(setIsModal(true)); // (поддержка вашего setIsModal, сейчас принимает boolean?)
    const timerId = setTimeout(() => dispatch(setModalFalse()), 20000);
    dispatch(setQuestion(question));
    dispatch(setTimerId(timerId));

    // Закрываем вопрос (ставим isClosed = true и сохраняем)
    dispatch(closeQuestionAndSave(themeId, questionId));
  };

  const sortedGames = useMemo(() => {
    return {
      ...games,
      games: games.map((theme) => ({
        ...theme,
        Questions: [...theme.Questions].sort((a, b) => a.id - b.id), // Сортировка по id
        // Или если хотите сортировать по points: .sort((a, b) => a.points - b.points)
      })),
    };
  }, [games]);

  return (
    <main className="container py-8">
      <Helmet>
        <title>Моя игра — Играть</title>
        <meta
          name="description"
          content="Игровое поле: 6 тем, 5 вопросов, единая таблица и подсчёт очков."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <section className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Игровое поле</h1>
        {/* <div className="rounded-md border px-4 py-2 font-semibold">Очки: {score}</div> */}
      </section>

      <section aria-label="Таблица вопросов" className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              {sortedGames.games.map((theme) => (
                <th
                  key={theme.id}
                  className="border px-3 py-2 bg-secondary text-secondary-foreground"
                >
                  {theme.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map((rowIndex) => (
              <tr key={rowIndex}>
                {sortedGames.games.map((theme) => {
                  const question = theme.Questions[rowIndex];
                  return (
                    <td key={`${theme.id}-${rowIndex}`} className="border p-0">
                      {question.isClosed ? (
                        // Закрытый вопрос - белая клетка с дефисом
                        <div className="w-full h-16 bg-white border flex items-center justify-center text-gray-400 text-xl">
                          -
                        </div>
                      ) : (
                        <Button
                          className="w-full h-16 rounded-none"
                          aria-label={`Вопрос на ${question.points} по теме ${theme.name}`}
                          onClick={() =>
                            handleQuestionClick(theme.id, question.id, question)
                          }
                        >
                          {question.points}
                        </Button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Button
        onClick={() => dispatch(resetGameAndStorage())}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Закончить игру
      </Button>

      <QuestionModal />
      <AnswerFeedback />
    </main>
  );
};

export default Game;
