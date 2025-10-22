import React, {useRef, useState} from "react";
import "./Quiz.css";
import {data} from "../../assets/data";

export function Quiz() {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let optionArr = [Option1, Option2, Option3, Option4];

  const nextbtn = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setQuestion(data[index + 1]);
    } else {
      setResult(true)
      return 0;
    }
    setLock(false);
    optionArr.forEach((option) => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.answer === ans) {
        e.target.classList.add("correct");
        setScore(score + 1);
        setLock(true);
      } else {
        e.target.classList.add("wrong");
        setTimeout(() => {
        optionArr[question.answer].current.classList.add("correct");
        }, 500);
        setLock(true);
      }
    }
  };

  const resetbtn = () => {
    setIndex(0);
    setQuestion(data[index]);
    setLock(false);
    setScore(0);
    setResult(false);
  }

  return (
    <>
      <div className="quiz-container">
        <h1>Welcome to the Quiz!</h1>
        <hr />
        {result ? <>
        <h2 className="questionText">Quiz Completed! You Scored {score} out of  {data.length}</h2>
        <button className="nextBtn" onClick={resetbtn}>
          Reset
        </button>
        </> : <>
        <h2 className="questionText">{index + 1}. {question.question}</h2>
        <ul className="optionsList">
          <li ref={Option1} onClick={(e) => {checkAns(e, 0); }}>{question.options[0]}</li>
          <li ref={Option2} onClick={(e) => {checkAns(e, 1); }}> {question.options[1]}</li>
          <li ref={Option3} onClick={(e) => {checkAns(e, 2);}}>{question.options[2]}</li>
          <li ref={Option4} onClick={(e) => {checkAns(e, 3); }}> {question.options[3]}</li>
        </ul>
        <button className="nextBtn" onClick={nextbtn}>
          Next
        </button>
        <div className="progressBar">
          {index + 1} of {data.length} questions
        </div>
        </>}
      </div>
    </>
  );
}
