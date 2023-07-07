import React from "react";

export default function Options({
  option,
  checkAnswer,
  isCorrect,
  userClicked,
  isAnswer,
}) {
  return (
    <>
      <button
        disabled={userClicked}
        value={option}
        onClick={(e) => checkAnswer(e.target.value)}
        className={`answer ${
          userClicked
            ? isCorrect
              ? "correct"
              : isAnswer
              ? "incorrect"
              : ""
            : ""
        }`}
      >
        {decodeURIComponent(option)}
      </button>
    </>
  );
}
