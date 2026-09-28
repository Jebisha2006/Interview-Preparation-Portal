import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function Test() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: "q1",
      question: "Which keyword is used to create a function in Python?",
      options: ["def", "function", "func", "define"],
      answer: "def",
    },
    {
      id: "q2",
      question: "Which data type is used to store True or False?",
      options: ["Integer", "String", "Boolean", "Float"],
      answer: "Boolean",
    },
    {
      id: "q3",
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/* */", "--"],
      answer: "#",
    },
    {
      id: "q4",
      question: "Which function is used to display output?",
      options: ["show()", "display()", "print()", "output()"],
      answer: "print()",
    },
    {
      id: "q5",
      question: "Which collection is enclosed in [] ?",
      options: ["Tuple", "Set", "List", "Dictionary"],
      answer: "List",
    },
    {
      id: "q6",
      question: "Which keyword is used for loops?",
      options: ["for", "repeat", "loop", "iterate"],
      answer: "for",
    },
    {
      id: "q7",
      question: "Which operator is used for exponent?",
      options: ["^", "**", "//", "%%"],
      answer: "**",
    },
    {
      id: "q8",
      question: "Which function returns length?",
      options: ["count()", "size()", "len()", "length()"],
      answer: "len()",
    },
    {
      id: "q9",
      question: "Which keyword is used for conditions?",
      options: ["when", "if", "check", "switch"],
      answer: "if",
    },
    {
      id: "q10",
      question: "Python is a _____ language.",
      options: ["Low Level", "Machine", "High Level", "Assembly"],
      answer: "High Level",
    },
    {
  id: "q11",
  question: "Which keyword is used to handle exceptions?",
  options: ["catch", "try", "except", "error"],
  answer: "except",
},
{
  id: "q12",
  question: "Which function converts a string to an integer?",
  options: ["str()", "int()", "float()", "input()"],
  answer: "int()",
},
{
  id: "q13",
  question: "Which operator is used for floor division?",
  options: ["/", "//", "%", "**"],
  answer: "//",
},
{
  id: "q14",
  question: "Which keyword is used to import a module?",
  options: ["include", "using", "import", "require"],
  answer: "import",
},
{
  id: "q15",
  question: "Which collection stores key-value pairs?",
  options: ["List", "Tuple", "Dictionary", "Set"],
  answer: "Dictionary",
},
{
  id: "q16",
  question: "Which function is used to get user input?",
  options: ["scan()", "read()", "input()", "accept()"],
  answer: "input()",
},
{
  id: "q17",
  question: "Which keyword is used to create a class?",
  options: ["struct", "class", "object", "new"],
  answer: "class",
},
{
  id: "q18",
  question: "Which method adds an item to a list?",
  options: ["insert()", "append()", "push()", "add()"],
  answer: "append()",
},
{
  id: "q19",
  question: "Which function is used to find the type of a variable?",
  options: ["typeof()", "type()", "datatype()", "kind()"],
  answer: "type()",
},
{
  id: "q20",
  question: "Which keyword is used to define an anonymous function?",
  options: ["lambda", "anonymous", "func", "inline"],
  answer: "lambda",
},
  ];

  const handleChange = (qid, value) => {
    setAnswers({
      ...answers,
      [qid]: value,
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

const percentage = (score / 20) * 100;

    const student_id = localStorage.getItem("student_id");

    await fetch("http://127.0.0.1:8000/api/save-result/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id,
        subject: "Python",
        score,
        total: 20,
        percentage,
      }),
    });

    navigate("/result", {
      state: {
        subject: "Python",
        score,
        total: 20,
        correct: score,
        wrong: 20 - score,
        percentage,
      },
    });
  };
  return (
    <>
      <Navbar />

      <div className="test-container">
        <h1>Python Test</h1>

        <h2 style={{ textAlign: "center", color: "red", marginBottom: "20px" }}>
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
                  onChange={(e) =>
                    handleChange(q.id, e.target.value)
                  }
                />

                <label>{option}</label>
              </div>
            ))}
          </div>
        ))}

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Test
        </button>
      </div>
    </>
  );
}

export default Test;