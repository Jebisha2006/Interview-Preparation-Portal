import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import { useEffect } from "react";

function AptitudeTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);

  const questions = [
    {
      id: "q1",
      question: "What is 15 + 25?",
      options: ["30", "35", "40", "45"],
      answer: "40",
    },
    {
      id: "q2",
      question: "If a train travels 60 km in 1 hour, how far will it travel in 3 hours?",
      options: ["120 km", "150 km", "180 km", "200 km"],
      answer: "180 km",
    },
    {
      id: "q3",
      question: "What is 12 × 8?",
      options: ["96", "84", "88", "108"],
      answer: "96",
    },
    {
      id: "q4",
      question: "Which number comes next? 2, 4, 6, 8, ?",
      options: ["9", "10", "12", "14"],
      answer: "10",
    },
    {
      id: "q5",
      question: "The square root of 144 is?",
      options: ["10", "11", "12", "14"],
      answer: "12",
    },
    {
      id: "q6",
      question: "50% of 200 is?",
      options: ["50", "100", "150", "200"],
      answer: "100",
    },
    {
      id: "q7",
      question: "Which is the largest number?",
      options: ["98", "89", "108", "99"],
      answer: "108",
    },
    {
      id: "q8",
      question: "If 5 pens cost ₹100, one pen costs?",
      options: ["₹10", "₹15", "₹20", "₹25"],
      answer: "₹20",
    },
    {
      id: "q9",
      question: "What is 9² ?",
      options: ["18", "72", "81", "99"],
      answer: "81",
    },
    {
      id: "q10",
      question: "Which is an even number?",
      options: ["17", "19", "22", "25"],
      answer: "22",
    },
    {
  id: "q11",
  question: "A shopkeeper gives 10% discount on ₹500. What is the selling price?",
  options: ["₹450", "₹400", "₹475", "₹425"],
  answer: "₹450",
},
{
  id: "q12",
  question: "What is 25% of 320?",
  options: ["70", "75", "80", "85"],
  answer: "80",
},
{
  id: "q13",
  question: "The average of 10, 20, 30, 40 and 50 is?",
  options: ["20", "25", "30", "35"],
  answer: "30",
},
{
  id: "q14",
  question: "If the cost price is ₹800 and selling price is ₹1000, the profit is?",
  options: ["₹100", "₹150", "₹200", "₹250"],
  answer: "₹200",
},
{
  id: "q15",
  question: "Find the next number: 3, 6, 9, 12, ?",
  options: ["14", "15", "16", "18"],
  answer: "15",
},
{
  id: "q16",
  question: "If a car travels at 80 km/hr, how far will it travel in 5 hours?",
  options: ["350 km", "380 km", "400 km", "450 km"],
  answer: "400 km",
},
{
  id: "q17",
  question: "Which number is divisible by both 2 and 5?",
  options: ["25", "30", "45", "55"],
  answer: "30",
},
{
  id: "q18",
  question: "What is 18 × 12?",
  options: ["196", "206", "216", "226"],
  answer: "216",
},
{
  id: "q19",
  question: "A rectangle has length 12 cm and breadth 8 cm. Its area is?",
  options: ["80", "88", "96", "104"],
  answer: "96",
},
{
  id: "q20",
  question: "What is the value of 7³?",
  options: ["343", "243", "441", "512"],
  answer: "343",
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
      subject: "Aptitude",
      score,
      total: questions.length,
      percentage,
    }),
  });

  navigate("/result", {
    state: {
      subject: "Aptitude",
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
        <h1>Aptitude Test</h1>
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

export default AptitudeTest;