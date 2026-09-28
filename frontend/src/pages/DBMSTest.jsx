import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import {useEffect } from "react";

function DBMSTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    { id: "q1", question: "DBMS stands for?", options: ["Database Management System", "Data Backup Management System", "Database Machine System", "None"], answer: "Database Management System" },
    { id: "q2", question: "Which language is used to query databases?", options: ["Java", "Python", "SQL", "C"], answer: "SQL" },
    { id: "q3", question: "Which command is used to retrieve data?", options: ["INSERT", "SELECT", "DELETE", "UPDATE"], answer: "SELECT" },
    { id: "q4", question: "Primary Key is?", options: ["Duplicate", "Unique", "Null", "Optional"], answer: "Unique" },
    { id: "q5", question: "Which command deletes a table?", options: ["REMOVE", "DELETE", "DROP", "CLEAR"], answer: "DROP" },
    { id: "q6", question: "Which SQL command adds data?", options: ["INSERT", "ADD", "CREATE", "UPDATE"], answer: "INSERT" },
    { id: "q7", question: "Which key connects two tables?", options: ["Primary Key", "Candidate Key", "Foreign Key", "Alternate Key"], answer: "Foreign Key" },
    { id: "q8", question: "SQL stands for?", options: ["Structured Query Language", "Simple Query Language", "System Query Language", "None"], answer: "Structured Query Language" },
    { id: "q9", question: "Which normal form removes partial dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: "2NF" },
    { id: "q10", question: "Which command modifies existing data?", options: ["UPDATE", "INSERT", "ALTER", "CREATE"], answer: "UPDATE" },
    {
  id: "q11",
  question: "Which SQL clause is used to filter records?",
  options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"],
  answer: "WHERE",
},
{
  id: "q12",
  question: "Which command is used to modify the structure of a table?",
  options: ["ALTER", "UPDATE", "MODIFY", "CHANGE"],
  answer: "ALTER",
},
{
  id: "q13",
  question: "Which SQL function returns the total number of rows?",
  options: ["SUM()", "COUNT()", "TOTAL()", "ROWS()"],
  answer: "COUNT()",
},
{
  id: "q14",
  question: "Which join returns matching records from both tables?",
  options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
  answer: "INNER JOIN",
},
{
  id: "q15",
  question: "Which constraint prevents duplicate values?",
  options: ["NOT NULL", "CHECK", "UNIQUE", "DEFAULT"],
  answer: "UNIQUE",
},
{
  id: "q16",
  question: "Which SQL command removes all rows but keeps the table?",
  options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
  answer: "TRUNCATE",
},
{
  id: "q17",
  question: "Which normal form removes transitive dependency?",
  options: ["1NF", "2NF", "3NF", "BCNF"],
  answer: "3NF",
},
{
  id: "q18",
  question: "Which key uniquely identifies each record in a table?",
  options: ["Foreign Key", "Primary Key", "Candidate Key", "Composite Key"],
  answer: "Primary Key",
},
{
  id: "q19",
  question: "Which SQL statement is used to create a new table?",
  options: ["BUILD TABLE", "CREATE TABLE", "NEW TABLE", "ADD TABLE"],
  answer: "CREATE TABLE",
},
{
  id: "q20",
  question: "Which SQL clause is used to sort records?",
  options: ["GROUP BY", "ORDER BY", "SORT BY", "HAVING"],
  answer: "ORDER BY",
},
  ];

  const [answers, setAnswers] = useState({});
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
      subject: "DBMS",
      score,
      total: questions.length,
      percentage,
    }),
  });

  navigate("/result", {
    state: {
      subject: "DBMS",
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
        <h1>DBMS Test</h1>
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

export default DBMSTest;