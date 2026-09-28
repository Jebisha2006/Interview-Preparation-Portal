import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function HRTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "Tell me about yourself is used for?", options: ["Self introduction", "Coding test", "DB test", "OS test"], answer: "Self introduction" },
    { id: "q2", question: "Strength means?", options: ["Your skills", "Your weakness", "Your marks", "Your salary"], answer: "Your skills" },
    { id: "q3", question: "Weakness should be?", options: ["Honest answer", "Fake answer", "Skip", "Ignore"], answer: "Honest answer" },
    { id: "q4", question: "Why should we hire you?", options: ["Confidence + skills", "Luck", "No reason", "Salary only"], answer: "Confidence + skills" },
    { id: "q5", question: "Career goal means?", options: ["Future plan", "Past job", "Marks", "Attendance"], answer: "Future plan" },
    { id: "q6", question: "Teamwork means?", options: ["Working together", "Working alone", "No work", "Coding"], answer: "Working together" },
    { id: "q7", question: "Leadership means?", options: ["Guiding team", "Following only", "Coding", "Testing"], answer: "Guiding team" },
    { id: "q8", question: "Communication skill is?", options: ["Important", "Not important", "Optional", "Useless"], answer: "Important" },
    { id: "q9", question: "Resume is?", options: ["Profile summary", "Code file", "Database", "Image"], answer: "Profile summary" },
    { id: "q10", question: "Interview purpose is?", options: ["Select candidate", "Reject all", "Time pass", "Gaming"], answer: "Select candidate" },
    { id: "q11", question: "Confidence means?", options: ["Self belief", "Fear", "Anger", "Confusion"], answer: "Self belief" },
    { id: "q12", question: "Punctuality means?", options: ["On time", "Late", "Early leave", "Skip"], answer: "On time" },
    { id: "q13", question: "Professional behavior is?", options: ["Good attitude", "Rude behavior", "No manners", "Lazy"], answer: "Good attitude" },
    { id: "q14", question: "Salary negotiation is?", options: ["Skill discussion", "Fight", "Ignore", "Skip"], answer: "Skill discussion" },
    { id: "q15", question: "Company culture means?", options: ["Work environment", "Food", "Dress", "Salary"], answer: "Work environment" },
    { id: "q16", question: "Dress code is important for?", options: ["Professional look", "Gaming", "Sleep", "Fun"], answer: "Professional look" },
    { id: "q17", question: "Stress interview checks?", options: ["Pressure handling", "Typing speed", "Coding", "Drawing"], answer: "Pressure handling" },
    { id: "q18", question: "Goal setting is?", options: ["Future target", "Past memory", "Marks", "Attendance"], answer: "Future target" },
    { id: "q19", question: "Problem solving means?", options: ["Finding solution", "Avoiding work", "Sleeping", "Ignoring"], answer: "Finding solution" },
    { id: "q20", question: "Final interview round is usually?", options: ["HR round", "Coding round", "Game round", "Exam"], answer: "HR round" },
  ];

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    if (timeLeft <= 0) return handleSubmit();

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

    await fetch("http://127.0.0.1:8000/api/save-result/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: localStorage.getItem("student_id"),
        subject: "HR Interview",
        score,
        total: questions.length,
        percentage,
      }),
    });

    navigate("/result", {
      state: {
        subject: "HR Interview",
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
        <h1>HR Interview Test</h1>

        <h2 style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>
          ⏱ Time Left: {formatTime(timeLeft)}
        </h2>

        {questions.map((q, index) => (
          <div className="question-card" key={q.id}>
            <h3>{index + 1}. {q.question}</h3>

            {q.options.map((option) => (
              <div className="option" key={option}>
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q.id]: e.target.value })
                  }
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

export default HRTest;