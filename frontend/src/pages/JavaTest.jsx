import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import {  useEffect } from "react";

function JavaTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    {
      id: "q1",
      question: "Java is a ______ language.",
      options: ["Programming", "Database", "Operating System", "Browser"],
      answer: "Programming",
    },
    {
      id: "q2",
      question: "Who developed Java?",
      options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
      answer: "Sun Microsystems",
    },
    {
      id: "q3",
      question: "Which keyword is used to create an object?",
      options: ["class", "new", "object", "create"],
      answer: "new",
    },
    {
      id: "q4",
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "run()", "main()", "init()"],
      answer: "main()",
    },
    {
      id: "q5",
      question: "Which symbol is used to end a statement in Java?",
      options: [".", ";", ":", ","],
      answer: ";",
    },
    {
      id: "q6",
      question: "Java is a _____ language.",
      options: ["Compiled", "Interpreted", "Both Compiled and Interpreted", "Assembly"],
      answer: "Both Compiled and Interpreted",
    },
    {
      id: "q7",
      question: "Which keyword is used for inheritance?",
      options: ["implements", "extends", "inherit", "super"],
      answer: "extends",
    },
    {
      id: "q8",
      question: "Which package is imported automatically?",
      options: ["java.util", "java.io", "java.lang", "java.sql"],
      answer: "java.lang",
    },
    {
      id: "q9",
      question: "Which loop executes at least once?",
      options: ["for", "while", "do while", "foreach"],
      answer: "do while",
    },
    {
      id: "q10",
      question: "Which keyword is used to define a class?",
      options: ["define", "object", "class", "new"],
      answer: "class",
    },
    {
  id: "q11",
  question: "Which keyword is used to inherit a class in Java?",
  options: ["extends", "implements", "inherits", "super"],
  answer: "extends",
},
{
  id: "q12",
  question: "Which method is the entry point of a Java program?",
  options: ["start()", "main()", "run()", "init()"],
  answer: "main()",
},
{
  id: "q13",
  question: "Which package is imported automatically in Java?",
  options: ["java.util", "java.io", "java.lang", "java.net"],
  answer: "java.lang",
},
{
  id: "q14",
  question: "Which keyword is used to create an object?",
  options: ["class", "new", "create", "object"],
  answer: "new",
},
{
  id: "q15",
  question: "Which keyword is used to prevent method overriding?",
  options: ["static", "const", "final", "private"],
  answer: "final",
},
{
  id: "q16",
  question: "Which loop executes at least once?",
  options: ["for", "while", "do-while", "foreach"],
  answer: "do-while",
},
{
  id: "q17",
  question: "Which operator is used to compare two values?",
  options: ["=", "==", "!=", "==="],
  answer: "==",
},
{
  id: "q18",
  question: "Which collection stores unique elements?",
  options: ["ArrayList", "Vector", "HashSet", "LinkedList"],
  answer: "HashSet",
},
{
  id: "q19",
  question: "Which exception occurs when dividing by zero?",
  options: [
    "IOException",
    "ArithmeticException",
    "NullPointerException",
    "ArrayIndexOutOfBoundsException"
  ],
  answer: "ArithmeticException",
},
{
  id: "q20",
  question: "Which keyword is used to handle exceptions?",
  options: ["try", "catch", "finally", "throws"],
  answer: "catch",
},
  ];

  const [answers, setAnswers] = useState({});

  const handleChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value,
    });
  };
  const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};
useEffect(() => {
  if (timeLeft <= 0) {
    handleSubmit();
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);
const handleSubmit = async () => {

  let score = 0;

  questions.forEach((q) => {
    if (answers[q.id] === q.answer) {
      score++;
    }
  });

  const percentage = Math.round((score / questions.length) * 100);

  const student_id = localStorage.getItem("student_id");

  await fetch("http://127.0.0.1:8000/api/save-result/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      student_id,
      subject: "Java",
      score,
      total: questions.length,
      percentage,
    }),
  });

  navigate("/result", {
    state: {
      subject: "Java",
      score,
      total: questions.length,
      correct: score,
      wrong: questions.length - score,
      percentage,
    },
  });

  };

  return (
    <>
      <Navbar />

      <div className="test-container">
        <h1>Java Test</h1>
        <h2
  style={{
    textAlign: "center",
    color: "red",
    marginBottom: "20px",
  }}>
  ⏱ Time Left: {formatTime(timeLeft)}
</h2>

        {questions.map((q, index) => (
          <div className="question-card" key={q.id}>
            <h3>
              {index + 1}. {q.question}
            </h3>

            {q.options.map((option, i) => (
              <div className="option" key={i}>
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
                {option}
              </div>
            ))}
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Test
        </button>
      </div>
    </>
  );
}

export default JavaTest;