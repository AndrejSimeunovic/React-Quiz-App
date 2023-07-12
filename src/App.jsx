import { useRef, useState } from "react";
import "./App.css";
import Game from "./Game";
import settings from "./settings.json";

function App() {
  const amountRef = useRef();
  const categoryRef = useRef();
  const difficultyRef = useRef();
  const typeRef = useRef();

  const [data, setData] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);

  function sendData(e) {
    e.preventDefault();
    setData({
      amount: amountRef.current.value,
      category: checkAny(categoryRef.current.value),
      difficulty: checkAny(difficultyRef.current.value),
      type: checkAny(typeRef.current.value),
    });
    setIsGenerated(true);
  }

  function checkAny(value) {
    return value === "any" ? "" : value;
  }

  function reloadPage() {
    setIsGenerated(false);
  }
  return (
    <>
      {isGenerated ? (
        <Game data={data} reloadPage={reloadPage} />
      ) : (
        <form onSubmit={sendData}>
          <div className="header">REACT QUIZ</div>
          <label htmlFor="amount">Number of Questions:</label>
          <input
            ref={amountRef}
            type="number"
            name="amount"
            id="amount"
            min="1"
            max="50"
            defaultValue="10"
          />

          <label htmlFor="category">Select Category:</label>
          <select ref={categoryRef} name="category" id="category">
            {settings.categories.map((cat, index) => {
              return (
                <option key={index} value={cat["id"]}>
                  {cat["name"]}
                </option>
              );
            })}
          </select>

          <label htmlFor="difficulty">Select Difficulty:</label>
          <select ref={difficultyRef} name="difficulty" id="difficulty">
            {Object.keys(settings.difficulty[0]).map((key, index) => {
              return (
                <option key={index} value={settings.difficulty[0][key]}>
                  {key}
                </option>
              );
            })}
          </select>

          <label htmlFor="type">Select Type:</label>
          <select ref={typeRef} name="type" id="type">
            {Object.keys(settings.type[0]).map((key, index) => {
              return (
                <option key={index} value={settings.type[0][key]}>
                  {key}
                </option>
              );
            })}
          </select>
          <button className="submitBtn" type="submit">
            Get Started
          </button>
        </form>
      )}
    </>
  );
}

export default App;
