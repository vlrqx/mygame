import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/shared/hooks/hooks";

export default function AnswerFeedback() {
  const isCorrectAnswer = useAppSelector(
    (state) => state.games.isCorrecctAnswer
  );
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isCorrectAnswer !== null) {
      // или другое условие, когда нужно показывать
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 2000); // скрыть через 2 секунды
      return () => clearTimeout(timer);
    }
  }, [isCorrectAnswer]);

  if (!showFeedback) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow text-white
      ${isCorrectAnswer ? "bg-green-500" : "bg-red-500"}`}
    >
      {isCorrectAnswer ? "Верно" : "Не верно"}
    </div>
  );
}
