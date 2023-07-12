import React, { useEffect, useState } from "react";
import "./Game.css";
import Question from "./Question";
import fetchData from "./Api";
import { FidgetSpinner } from "react-loader-spinner";

export default function Game({ data, reloadPage }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionNbr, setQuestionNbr] = useState(1);
  const [score, setScore] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  function changeQuestion() {
    setQuestionNbr((curr) => curr + 1);
    setUserClicked(false);
  }

  function updateScore(ans) {
    if (ans === questions[questionNbr - 1].correct_answer)
      setScore((curr) => curr + 1);
  }

  function restart() {
    setQuestionNbr(1)
    setScore(0)
  }

  function checkAnswer(ans) {
    setUserClicked(true);
    setUserAnswer(ans);
    updateScore(ans);
  }
  useEffect(() => {
    fetchData(data)
      .then((data) => setQuestions(data))
      .catch(() => console.log("ERROR"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={["#ff0000", "#00ff00", "#0000ff"]}
        backgroundColor="#F4442E"
      />
    );
  }

  return (
    <>
      <div className="container">
        {questionNbr > questions.length ? (
          <>
            <div className="finished">Game Finished!</div>
            <div className="finished">Your final score: {score}</div>
            <button className="startOverBtn" onClick={() => restart()}>
              Retake Quiz
            </button>
            <button className="startOverBtn" onClick={() => reloadPage()}>
              Back to home page
            </button>
          </>
        ) : (
          <>
            <div className="score">Score: {score}</div>
            <div className="game-container">
              <div className="question-number">
                Question {questionNbr}/{questions.length}
              </div>
              <Question
                questionObj={questions[questionNbr - 1]}
                questionNbr={questionNbr}
                updateScore={updateScore}
                userClicked={userClicked}
                checkAnswer={checkAnswer}
                userAnswer={userAnswer}
              />
              {userClicked ? (
                <button onClick={changeQuestion} className="nextBtn">
                  Next question
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}
