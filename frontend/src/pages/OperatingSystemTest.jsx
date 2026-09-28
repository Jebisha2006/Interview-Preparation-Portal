import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import {  useEffect } from "react";
function OperatingSystemTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    { id: "q1", question: "What is an Operating System?", options: ["Software", "Hardware", "Compiler", "Language"], answer: "Software" },
    { id: "q2", question: "Which is an Operating System?", options: ["Windows", "MS Word", "Chrome", "Photoshop"], answer: "Windows" },
    { id: "q3", question: "Linux is?", options: ["Open Source", "Paid Only", "Database", "Browser"], answer: "Open Source" },
    { id: "q4", question: "Which OS is developed by Apple?", options: ["Windows", "Ubuntu", "macOS", "Android"], answer: "macOS" },
    { id: "q5", question: "CPU Scheduling belongs to?", options: ["OS", "Java", "DBMS", "Python"], answer: "OS" },
    { id: "q6", question: "Which memory is temporary?", options: ["ROM", "RAM", "Hard Disk", "SSD"], answer: "RAM" },
    { id: "q7", question: "Which is not an Operating System?", options: ["Linux", "Windows", "Oracle", "Android"], answer: "Oracle" },
    { id: "q8", question: "Full form of GUI?", options: ["Graphical User Interface", "General User Interface", "Global User Interface", "None"], answer: "Graphical User Interface" },
    { id: "q9", question: "Android is based on?", options: ["Linux", "Windows", "Java", "Oracle"], answer: "Linux" },
    { id: "q10", question: "Which OS is used in iPhone?", options: ["Android", "Windows", "iOS", "Linux"], answer: "iOS" },
    {
  id: "q11",
  question: "Which scheduling algorithm gives the minimum average waiting time?",
  options: ["FCFS", "SJF", "Round Robin", "Priority"],
  answer: "SJF",
},
{
  id: "q12",
  question: "Which scheduling algorithm uses time quantum?",
  options: ["FCFS", "Round Robin", "SJF", "Priority"],
  answer: "Round Robin",
},
{
  id: "q13",
  question: "Which memory management technique uses pages?",
  options: ["Paging", "Segmentation", "Swapping", "Spooling"],
  answer: "Paging",
},
{
  id: "q14",
  question: "Deadlock occurs when?",
  options: [
    "Processes wait forever",
    "CPU is idle",
    "Memory is full",
    "Disk is full"
  ],
  answer: "Processes wait forever",
},
{
  id: "q15",
  question: "Which memory is non-volatile?",
  options: ["RAM", "Cache", "ROM", "Registers"],
  answer: "ROM",
},
{
  id: "q16",
  question: "Which scheduling algorithm is non-preemptive?",
  options: ["FCFS", "Round Robin", "SRTF", "Priority (Preemptive)"],
  answer: "FCFS",
},
{
  id: "q17",
  question: "Which OS allows multiple users simultaneously?",
  options: ["Single User OS", "Multi User OS", "Batch OS", "Embedded OS"],
  answer: "Multi User OS",
},
{
  id: "q18",
  question: "Which memory is the fastest?",
  options: ["RAM", "Cache", "Hard Disk", "ROM"],
  answer: "Cache",
},
{
  id: "q19",
  question: "Which component manages files in an Operating System?",
  options: ["File System", "Compiler", "Interpreter", "Assembler"],
  answer: "File System",
},
{
  id: "q20",
  question: "Which Operating System is mainly used for servers?",
  options: ["Linux", "MS Paint", "PowerPoint", "Excel"],
  answer: "Linux",
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
      subject: "Operating System",
      score,
      total: questions.length,
      percentage,
    }),
  });

  navigate("/result", {
    state: {
      subject: "Operating System",
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
        <h1>Operating System Test</h1>
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

export default OperatingSystemTest;