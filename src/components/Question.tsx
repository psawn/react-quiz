import { useState } from "react";
import { Answers } from "./Answer";
import { QuestionTimer } from "./QuestionTimer";
import QUESTIONS from "../question";

export function Question({
  index,
  onSelectAnswer,
  handleSkipAnswer,
}: {
  index: number;
  onSelectAnswer: (selectedAnswer: string) => void;
  handleSkipAnswer: () => void;
}) {
  const [answer, setAnswer] = useState<{
    selectedAnswer: string;
    isCorrect: null | boolean;
  }>({
    selectedAnswer: "",
    isCorrect: null,
  });

  // let timer = 10000;

  // if (answer.selectedAnswer) {
  //   timer = 500;
  // }

  // if (answer.isCorrect !== null) {
  //   timer = 2000;
  // }

  function handleSelectAnswer(answer: string) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 500);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } 

  // if (answer.selectedAnswer) {
  //   answerState = "answered";
  // }

  return (
    <div id="question">
      <QuestionTimer
        // key={timer}
        // timeout={timer}
        // key={index}
        timeout={10000}
        onTimeout={answer.selectedAnswer === "" ? handleSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelectedAnswer={handleSelectAnswer}
      />
    </div>
  );
}
