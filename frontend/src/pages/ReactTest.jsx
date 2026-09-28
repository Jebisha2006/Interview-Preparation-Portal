import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function ReactTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "React is?", options: ["Library", "Framework"], answer: "Library" },
    { id: "q2", question: "JSX stands for?", options: ["JavaScript XML", "Java Syntax"], answer: "JavaScript XML" },
    { id: "q3", question: "React uses?", options: ["Virtual DOM", "Real DOM"], answer: "Virtual DOM" },
    { id: "q4", question: "React created by?", options: ["Google", "Facebook"], answer: "Facebook" },
    { id: "q5", question: "useState is?", options: ["Hook", "API"], answer: "Hook" },
    { id: "q6", question: "Props are?", options: ["Read-only", "Mutable"], answer: "Read-only" },
    { id: "q7", question: "useEffect used for?", options: ["Side effects", "Styling"], answer: "Side effects" },
    { id: "q8", question: "React runs in?", options: ["Browser", "Server"], answer: "Browser" },
    { id: "q9", question: "Component means?", options: ["Reusable UI", "DB"], answer: "Reusable UI" },
    { id: "q10", question: "State means?", options: ["Data", "Style"], answer: "Data" },
    { id: "q11", question: "React Router used for?", options: ["Navigation", "DB"], answer: "Navigation" },
    { id: "q12", question: "Key in React?", options: ["Unique id", "Style"], answer: "Unique id" },
    { id: "q13", question: "React file?", options: [".jsx", ".css"], answer: ".jsx" },
    { id: "q14", question: "Virtual DOM improves?", options: ["Performance", "Storage"], answer: "Performance" },
    { id: "q15", question: "Hooks introduced in?", options: ["16.8", "15"], answer: "16.8" },
    { id: "q16", question: "React is?", options: ["Frontend", "Backend"], answer: "Frontend" },
    { id: "q17", question: "Fragment used for?", options: ["Multiple elements", "DB"], answer: "Multiple elements" },
    { id: "q18", question: "JSX looks like?", options: ["HTML", "SQL"], answer: "HTML" },
    { id: "q19", question: "React DOM renders to?", options: ["HTML page", "DB"], answer: "HTML page" },
    { id: "q20", question: "React is developed in?", options: ["JS", "Python"], answer: "JS" },
  ];

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    if (timeLeft <= 0) return handleSubmit();
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });

    const percentage = Math.round((score / questions.length) * 100);

    await fetch("http://127.0.0.1:8000/api/save-result/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: localStorage.getItem("student_id"),
        subject: "React",
        score,
        total: questions.length,
        percentage,
      }),
    });

    navigate("/result", {
      state: { subject: "React", score, total: questions.length, percentage },
    });
  };

  return (
    <>
      <Navbar />
      <div className="test-container">
        <h1>React Test</h1>
        <h2>⏱ Time Left: {formatTime(timeLeft)}</h2>

        {questions.map((q, i) => (
          <div className="question-card" key={q.id}>
            <h3>{i + 1}. {q.question}</h3>
            {q.options.map(opt => (
              <div className="option" key={opt}>
                <input type="radio" name={q.id}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
                {opt}
              </div>
            ))}
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
      </div>
    </>
  );
}

export default ReactTest;