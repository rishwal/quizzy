import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, chnageAttendedStatus } from "../../features/quizSlice";
import { BsQuestionCircleFill } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import { Bs3CircleFill } from "react-icons/bs";
import { Bs4CircleFill } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import axios from "axios";

import "./quiz.css";

const Quiz = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((store) => store.quiz);
  const [optionsDisabled, setOptionsDisabled] = useState(Array(4).fill(false));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stylebg, setstylebg] = useState({});
  const [time, settime] = useState(20);
  const category = "javascript";

  useEffect(() => {
    dispatch(fetchQuestions(category));

    setOptionsDisabled(quizState.data.map(() => Array(4).fill(false)));
    let interval;
    interval = setInterval(() => {
      settime((prev) => prev - 1);
    }, 1000);
    settime(20);
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex]);

  if (time <= 0) {
    setCurrentQuestionIndex((prev) => prev + 1);
    settime(20);
  }
  const valuate = async (e, id) => {
    console.log(e);
    const correctAnswerKey = Object.entries(
      quizState.data[currentQuestionIndex].correct_answers
    )
      .find(([prop, value]) => value === "true")[0]
      .slice(0, 8);

    if (e.target.id === correctAnswerKey) {
      try {
        const res = await axios.put(
          "https://quizapi.io/api/v1/questions?apiKey=6rBSjmBkyK4K6nbagrvMRVUlIvy4IpJvH9Ya8AZS&category=code&difficulty=Easy&limit=10&tags=JavaScript"
        );
        return res.data;
      } catch (err) {
        throw err;
      }
      e.target.parentElement.style.backgroundColor = "lightgreen";
      e.target.childNodes[4].style.display = "unset";
    } else {
      e.target.parentElement.style.backgroundColor = "rgba(255, 0, 0, 0.422)";
      e.target.childNodes[2].style.visibility = "visible";
    }

    dispatch(chnageAttendedStatus(quizState.data[currentQuestionIndex].id));
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      return prev < quizState.data.length - 1 ? prev + 1 : prev;
    });
  };

  const hasNextQuestion = currentQuestionIndex < quizState.data.length - 1;
  const Minindex = currentQuestionIndex > 0;

  return quizState.status === "loading" ? (
    <div className="loadingPage">
      <Spinner animation="border" role="status" className="spinner"></Spinner>
    </div>
  ) : (
    <section id="quizPage">
      <section className="question-section container">
        <div className="question-container">
          <span className="category-conatiner">
            {" "}
            <BsFilterLeft className="category-icon" />
            <span>Javascript</span>
          </span>
          <div className="clock">
            <p style={{ fontFamily: "" }}>
              {time}
              <span>s</span>
            </p>
          </div>
          <div className="question">
            <p>
              <BsQuestionCircleFill className="question-icon" />
              {[currentQuestionIndex + 1] +
                " . " +
                quizState.data[currentQuestionIndex]?.question}
            </p>
          </div>
        </div>
      </section>

      <section id="answer-section">
        <div className="container">
          <div className="row ">
            <div className="col-sm-12 col-md-6 option-column">
              <div className="options" style={stylebg}>
                <button
                  className="option-btn"
                  onClick={(e) => valuate(e)}
                  id="answer_a"
                  disabled={quizState.data[currentQuestionIndex]?.attended}
                >
                  <Bs1CircleFill className="number-icons" />
                  {quizState.data[currentQuestionIndex]?.answers?.answer_a}
                  <IoMdCloseCircle className="wrong-icon" />{" "}
                  <HiBadgeCheck className="right-icon" />
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 option-column">
              <div className="options">
                <button
                  className="option-btn"
                  onClick={(e) => valuate(e)}
                  id="answer_b"
                  disabled={quizState.data[currentQuestionIndex]?.attended}
                >
                  <Bs2CircleFill className="number-icons" />
                  {quizState.data[currentQuestionIndex]?.answers?.answer_b}
                  <IoMdCloseCircle className="wrong-icon" />{" "}
                  <HiBadgeCheck className="right-icon" />
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 option-column">
              <div className="options">
                <button
                  className="option-btn"
                  onClick={(e) => valuate(e)}
                  id="answer_c"
                  disabled={quizState.data[currentQuestionIndex]?.attended}
                >
                  <Bs3CircleFill className="number-icons" />
                  {quizState.data[currentQuestionIndex]?.answers?.answer_c}
                  <IoMdCloseCircle className="wrong-icon" />{" "}
                  <HiBadgeCheck className="right-icon" />
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 option-column">
              <div className="options" style={stylebg}>
                <button
                  className="option-btn"
                  onClick={(e) => valuate(e)}
                  id="answer_d"
                  disabled={quizState.data[currentQuestionIndex]?.attended}
                >
                  <Bs4CircleFill className="number-icons" />
                  {quizState.data[currentQuestionIndex]?.answers?.answer_d}
                  <IoMdCloseCircle className="wrong-icon" />{" "}
                  <HiBadgeCheck className="right-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="question-navigation">
        <div className="navigation-buttons">
          <button
            className="nav-button "
            onClick={goToPreviousQuestion}
            disabled={!Minindex}
          >
            <FaCircleArrowLeft
              style={{ marginRight: "5px" }}
              className="prev-btn"
            />
            <span className="navigation-text"> Prev</span>
          </button>
          <button
            className="nav-button "
            onClick={goToNextQuestion}
            disabled={!hasNextQuestion}
          >
            <span className="navigation-text"> Next</span>
            <FaCircleArrowRight
              style={{ marginLeft: "8px" }}
              className="next-btn"
            />
          </button>
        </div>
      </section>

      {/* <h1>QUIZZY</h1>
      <h2>
        {currentQuestionIndex +
          1 +
          " " +
          quizState.data[currentQuestionIndex]?.question}
      </h2>
      <div>
        {" "}
        <label htmlFor="answer_a">
          A.{quizState.data[currentQuestionIndex]?.answers?.answer_a}
        </label>
        <input
          type="radio"
          id="answer_a"
          name="options"
          onClick={(e) => valuate(e)}
          disabled={quizState.data[currentQuestionIndex]?.attended}
        />
        <label htmlFor="answer_b">
          B.{quizState.data[currentQuestionIndex]?.answers?.answer_b}
        </label>
        <input
          type="radio"
          id="answer_b"
          name="options"
          onClick={(e) => valuate(e)}
          disabled={quizState.data[currentQuestionIndex]?.attended}
        />
        <label htmlFor="answer_c">
          C.{quizState.data[currentQuestionIndex]?.answers?.answer_c}
        </label>
        <input
          type="radio"
          id="answer_c"
          name="options"
          onClick={(e) => valuate(e)}
          disabled={quizState.data[currentQuestionIndex]?.attended}
        />
        <label htmlFor="answer_c">
          D.{quizState.data[currentQuestionIndex]?.answers?.answer_d}
        </label>
        <input
          type="radio"
          id="answer_c"
          name="options"
          onClick={(e) => valuate(e)}
          disabled={quizState.data[currentQuestionIndex]?.attended}
        />
      </div>
      <button onClick={goToPreviousQuestion} disabled={!Minindex}>
        Previos
      </button>
      <button onClick={goToNextQuestion} disabled={!hasNextQuestion}>
        {hasNextQuestion ? "Next Question" : "Finish Quiz"}
      </button> */}
    </section>
  );
};

export default Quiz;
