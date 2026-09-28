import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function SQLTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "SQL full form?", options: ["Structured Query Language", "Simple Query Language", "System Query Language", "None"], answer: "Structured Query Language" },
    { id: "q2", question: "Primary key is used for?", options: ["Unique identification", "Sorting", "Deleting", "Indexing only"], answer: "Unique identification" },
    { id: "q3", question: "Which command is used to retrieve data?", options: ["SELECT", "INSERT", "UPDATE", "DELETE"], answer: "SELECT" },
    { id: "q4", question: "Which clause is used to filter data?", options: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], answer: "WHERE" },
    { id: "q5", question: "Which command is used to add data?", options: ["INSERT", "SELECT", "DROP", "ALTER"], answer: "INSERT" },
    { id: "q6", question: "Which command removes table?", options: ["DROP", "DELETE", "REMOVE", "CLEAR"], answer: "DROP" },
    { id: "q7", question: "Which command modifies data?", options: ["UPDATE", "ALTER", "CHANGE", "MODIFY"], answer: "UPDATE" },
    { id: "q8", question: "SQL is a?", options: ["Query Language", "Programming Language", "OS", "Compiler"], answer: "Query Language" },
    { id: "q9", question: "Which joins tables?", options: ["JOIN", "UNION", "MERGE", "LINK"], answer: "JOIN" },
    { id: "q10", question: "Which key links tables?", options: ["Foreign Key", "Primary Key", "Unique Key", "Index"], answer: "Foreign Key" },
    { id: "q11", question: "Which function counts rows?", options: ["COUNT()", "SUM()", "AVG()", "TOTAL()"], answer: "COUNT()" },
    { id: "q12", question: "Which clause groups data?", options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"], answer: "GROUP BY" },
    { id: "q13", question: "Which clause filters grouped data?", options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"], answer: "HAVING" },
    { id: "q14", question: "Which is used for sorting?", options: ["ORDER BY", "GROUP BY", "SORT", "FILTER"], answer: "ORDER BY" },
    { id: "q15", question: "NULL means?", options: ["No value", "Zero", "Empty string", "Undefined table"], answer: "No value" },
    { id: "q16", question: "Which operator is used for pattern matching?", options: ["LIKE", "IN", "BETWEEN", "IS"], answer: "LIKE" },
    { id: "q17", question: "Which SQL command is DDL?", options: ["CREATE", "SELECT", "INSERT", "UPDATE"], answer: "CREATE" },
    { id: "q18", question: "Which command creates table?", options: ["CREATE TABLE", "MAKE TABLE", "NEW TABLE", "BUILD TABLE"], answer: "CREATE TABLE" },
    { id: "q19", question: "Which is used to delete rows?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE ONLY"], answer: "DELETE" },
    { id: "q20", question: "SQL works with?", options: ["Database", "Browser", "OS", "Compiler"], answer: "Database" },
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
        subject: "SQL",
        score,
        total: questions.length,
        percentage,
      }),
    });

    navigate("/result", {
      state: {
        subject: "SQL",
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
        <h1>SQL Test</h1>

        <h2
          style={{
            textAlign: "center",
            color: "red",
            marginBottom: "20px",
          }}
        >
          ⏱ Time Left: {formatTime(timeLeft)}
        </h2>

        {questions.map((q, index) => (
          <div className="question-card" key={q.id}>
            <h3>
              {index + 1}. {q.question}
            </h3>

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

export default SQLTest;