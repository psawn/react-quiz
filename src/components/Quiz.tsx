import { useState, useCallback } from "react";
import QUESTIONS from "../question";
import { Question } from "./Question";
import { Summary } from "./Summary";

export function Quiz() {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer: string | null
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers}/>;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
