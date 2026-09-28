import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import { useEffect } from "react";
function ComputerNetworksTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    { id: "q1", question: "LAN stands for?", options: ["Local Area Network", "Large Area Network", "Long Area Network", "None"], answer: "Local Area Network" },
    { id: "q2", question: "WAN stands for?", options: ["Wide Area Network", "Wireless Area Network", "Web Area Network", "None"], answer: "Wide Area Network" },
    { id: "q3", question: "Which device connects networks?", options: ["Router", "Keyboard", "Mouse", "Printer"], answer: "Router" },
    { id: "q4", question: "IP stands for?", options: ["Internet Protocol", "Internal Program", "Internet Program", "None"], answer: "Internet Protocol" },
    { id: "q5", question: "HTTP is used for?", options: ["Web Browsing", "Printing", "Database", "Gaming"], answer: "Web Browsing" },
    { id: "q6", question: "Which protocol is secure?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], answer: "HTTPS" },
    { id: "q7", question: "Which device provides Wi-Fi?", options: ["Router", "Scanner", "Monitor", "Speaker"], answer: "Router" },
    { id: "q8", question: "Full form of DNS?", options: ["Domain Name System", "Data Name Service", "Digital Network System", "None"], answer: "Domain Name System" },
    { id: "q9", question: "Which topology has a central hub?", options: ["Bus", "Star", "Ring", "Mesh"], answer: "Star" },
    { id: "q10", question: "Which protocol transfers files?", options: ["FTP", "HTTP", "SMTP", "POP3"], answer: "FTP" },
   {
  id: "q11",
  question: "Which protocol is used to send emails?",
  options: ["SMTP", "HTTP", "FTP", "POP3"],
  answer: "SMTP",
},
{
  id: "q12",
  question: "Which protocol is used to receive emails?",
  options: ["SMTP", "POP3", "HTTP", "DNS"],
  answer: "POP3",
},
{
  id: "q13",
  question: "Which layer of the OSI model is responsible for routing?",
  options: ["Network Layer", "Transport Layer", "Session Layer", "Data Link Layer"],
  answer: "Network Layer",
},
{
  id: "q14",
  question: "How many layers are there in the OSI model?",
  options: ["5", "6", "7", "8"],
  answer: "7",
},
{
  id: "q15",
  question: "Which protocol automatically assigns IP addresses?",
  options: ["DNS", "DHCP", "HTTP", "FTP"],
  answer: "DHCP",
},
{
  id: "q16",
  question: "Which device forwards data based on MAC address?",
  options: ["Router", "Switch", "Hub", "Repeater"],
  answer: "Switch",
},
{
  id: "q17",
  question: "Which topology connects every device to every other device?",
  options: ["Bus", "Ring", "Mesh", "Star"],
  answer: "Mesh",
},
{
  id: "q18",
  question: "Which protocol is used for secure remote login?",
  options: ["FTP", "SSH", "HTTP", "SMTP"],
  answer: "SSH",
},
{
  id: "q19",
  question: "Which layer of the TCP/IP model corresponds to the OSI Transport Layer?",
  options: ["Application", "Transport", "Internet", "Network Access"],
  answer: "Transport",
},
{
  id: "q20",
  question: "Which command is commonly used to test network connectivity?",
  options: ["ping", "copy", "dir", "mkdir"],
  answer: "ping",
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
      subject: "Computer Networks",
      score,
      total: questions.length,
      percentage,
    }),
  });

  navigate("/result", {
    state: {
      subject: "Computer Networks",
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
        <h1>Computer Networks Test</h1>
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

export default ComputerNetworksTest;