import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../question";

export function Summary({ userAnswers }: { userAnswers: (string | null)[] }) {
  const skippedAnswers = userAnswers.filter((answers) => answers === null);
  const corrrectAnswers = userAnswers.filter(
    (answers, index) => answers === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswersShare = Math.round((corrrectAnswers.length / userAnswers.length) * 100);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} />
      <h2>Quiz complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClasses = "user-answer";

          if (answer === null) {
            cssClasses += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClasses += " correct";
          } else {
            cssClasses += " wrong";
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClasses}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
