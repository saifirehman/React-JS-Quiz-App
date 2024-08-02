import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const optionArray = [option1, option2, option3, option4];

  useEffect(() => {
    // Reset lock state and option styles on index change
    setLock(false);
    optionArray.forEach((option) => {
      if (option.current) {
        option.current.classList.remove("correct", "wrong");
      }
    });
  }, [index]);

  const CheckAns = (e, ans) => {
    if (!lock) {
      const correctAnswer = data[index].ans; // Correct way to access the answer
      if (correctAnswer === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
      }
      setLock(true);
      // Highlight the correct answer
      if (optionArray[correctAnswer - 1]?.current) {
        optionArray[correctAnswer - 1].current.classList.add("correct");
      }
    }
  };

  const handleNext = () => {
    if (index === data.length - 1) {
      setResult(true);
      return;
    }
    setIndex(index + 1);
  };

  const question = data[index];

  if (result) {
    return (
      <div className="Container">
        <h1>Quiz Completed</h1>
        <p>
          Your score: {score} out of {data.length}
        </p>
      </div>
    );
  }

  return (
    <div className="Container">
      <h1>Quiz App</h1>
      <hr />
      <h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li ref={option1} onClick={(e) => CheckAns(e, 1)}>
          {question.option1}
        </li>
        <li ref={option2} onClick={(e) => CheckAns(e, 2)}>
          {question.option2}
        </li>
        <li ref={option3} onClick={(e) => CheckAns(e, 3)}>
          {question.option3}
        </li>
        <li ref={option4} onClick={(e) => CheckAns(e, 4)}>
          {question.option4}
        </li>
      </ul>
      <button onClick={handleNext} disabled={!lock}>
        Next
      </button>
      <div className="index">
        {index + 1} of {data.length} Questions
      </div>
    </div>
  );
};

export default Quiz;
