import React from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import {
  isCorrecctAnswer,
  setAnswer,
  setIsModal,
} from "@/entities/games/model/gamesSlice";

export default function QuestionModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isModal, question, timerId, answer } = useAppSelector(
    (state) => state.games
  );

  if (!isModal) return null;

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{question.name}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={() => (
              dispatch(setIsModal()),
              clearTimeout(timerId),
              dispatch(setAnswer(""))
            )}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <input
            type="text"
            placeholder="Введите ответ"
            value={answer}
            onChange={(e) => dispatch(setAnswer(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t">
          <button
            type="button"
            onClick={() => (
              dispatch(setIsModal()),
              clearTimeout(timerId),
              dispatch(
                isCorrecctAnswer(
                  question.answer.toLowerCase() ===
                    answer.replace(/\s+/g, "").toLowerCase()
                )
              ),
              dispatch(setAnswer(""))
            )}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded"
          >
            Ответить
          </button>
        </div>
      </div>
    </div>
  );
}
