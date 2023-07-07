import React, { useMemo } from "react";
import Options from "./Options";
import { shuffleArray } from "./utils";

export default function Question({
  questionObj,
  userClicked,
  checkAnswer,
  userAnswer,
}) {
  const options = useMemo(
    () =>
      shuffleArray([
        questionObj.correct_answer,
        ...questionObj.incorrect_answers,
      ]),
    [questionObj]
  );

  return (
    <>
      <div className="question">{decodeURIComponent(questionObj.question)}</div>
      <div className="answers-grid">
        {options.map((option, index) => {
          return (
            <Options
              key={index}
              checkAnswer={checkAnswer}
              isCorrect={options[index] === questionObj.correct_answer}
              userClicked={userClicked}
              option={option}
              isAnswer={userAnswer === options[index]}
            />
          );
        })}
      </div>
    </>
  );
}
