import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function WebTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "HTML full form?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Language", "None"], answer: "Hyper Text Markup Language" },
    { id: "q2", question: "CSS used for?", options: ["Styling", "Database", "Logic", "Server"], answer: "Styling" },
    { id: "q3", question: "JavaScript is used for?", options: ["Logic", "Styling", "Database", "OS"], answer: "Logic" },
    { id: "q4", question: "HTML tag for link?", options: ["<a>", "<link>", "<href>", "<url>"], answer: "<a>" },
    { id: "q5", question: "CSS full form?", options: ["Cascading Style Sheets", "Computer Style Sheet", "Creative Style System", "None"], answer: "Cascading Style Sheets" },
    { id: "q6", question: "Which tag is for image?", options: ["<img>", "<image>", "<pic>", "<src>"], answer: "<img>" },
    { id: "q7", question: "CSS property for text color?", options: ["color", "font-color", "text-color", "bg-color"], answer: "color" },
    { id: "q8", question: "JS file extension?", options: [".js", ".jsx", ".html", ".css"], answer: ".js" },
    { id: "q9", question: "HTML file extension?", options: [".html", ".css", ".js", ".php"], answer: ".html" },
    { id: "q10", question: "CSS file extension?", options: [".css", ".js", ".html", ".json"], answer: ".css" },
    { id: "q11", question: "Bootstrap is?", options: ["CSS Framework", "Database", "Backend", "Language"], answer: "CSS Framework" },
    { id: "q12", question: "DOM stands for?", options: ["Document Object Model", "Data Object Model", "Digital Object Model", "None"], answer: "Document Object Model" },
    { id: "q13", question: "JS keyword for function?", options: ["function", "def", "fun", "method"], answer: "function" },
    { id: "q14", question: "Frontend means?", options: ["UI part", "Database", "Server", "OS"], answer: "UI part" },
    { id: "q15", question: "Backend means?", options: ["Server logic", "UI", "CSS", "HTML"], answer: "Server logic" },
    { id: "q16", question: "Which is browser language?", options: ["JavaScript", "Python", "C++", "Java"], answer: "JavaScript" },
    { id: "q17", question: "HTML is used for?", options: ["Structure", "Logic", "Database", "Server"], answer: "Structure" },
    { id: "q18", question: "CSS is used for?", options: ["Design", "Logic", "Database", "API"], answer: "Design" },
    { id: "q19", question: "JS runs in?", options: ["Browser", "Database", "Server only", "Compiler"], answer: "Browser" },
    { id: "q20", question: "Responsive design means?", options: ["Mobile friendly", "Static page", "Backend system", "Database design"], answer: "Mobile friendly" },
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
        subject: "Web Development",
        score,
        total: questions.length,
        percentage,
      }),
    });

    navigate("/result", {
      state: {
        subject: "Web Development",
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
        <h1>Web Development Test</h1>

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

export default WebTest;