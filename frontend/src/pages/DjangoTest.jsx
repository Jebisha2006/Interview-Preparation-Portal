import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function DjangoTest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "Django is what type of framework?", options: ["Python Web Framework", "Java Framework", "Frontend Library", "Database"], answer: "Python Web Framework" },
    { id: "q2", question: "Django follows which pattern?", options: ["MVT", "MVC", "MVVM", "None"], answer: "MVT" },
    { id: "q3", question: "Django is written in?", options: ["Python", "Java", "C++", "JavaScript"], answer: "Python" },
    { id: "q4", question: "Default database in Django?", options: ["SQLite", "MySQL", "MongoDB", "PostgreSQL"], answer: "SQLite" },
    { id: "q5", question: "Which file handles URL routing?", options: ["urls.py", "views.py", "models.py", "settings.py"], answer: "urls.py" },
    { id: "q6", question: "Which file contains business logic?", options: ["views.py", "models.py", "urls.py", "admin.py"], answer: "views.py" },
    { id: "q7", question: "Which file defines database structure?", options: ["models.py", "views.py", "urls.py", "forms.py"], answer: "models.py" },
    { id: "q8", question: "Django admin is used for?", options: ["Manage database easily", "Frontend design", "CSS styling", "API only"], answer: "Manage database easily" },
    { id: "q9", question: "Command to create Django project?", options: ["django-admin startproject", "django create", "start django app", "python run"], answer: "django-admin startproject" },
    { id: "q10", question: "Command to run server?", options: ["python manage.py runserver", "django run", "start server", "run django"], answer: "python manage.py runserver" },
    { id: "q11", question: "Django uses which ORM?", options: ["Built-in ORM", "Hibernate", "Sequelize", "None"], answer: "Built-in ORM" },
    { id: "q12", question: "Django is?", options: ["Secure framework", "Unsafe framework", "Frontend tool", "DB tool"], answer: "Secure framework" },
    { id: "q13", question: "CSRF in Django means?", options: ["Security feature", "Database", "Function", "Library"], answer: "Security feature" },
    { id: "q14", question: "Which handles templates?", options: ["HTML files", "models.py", "views.py only", "settings.py"], answer: "HTML files" },
    { id: "q15", question: "Django is best for?", options: ["Web applications", "Games", "Mobile apps only", "OS"], answer: "Web applications" },
    { id: "q16", question: "Django supports which architecture?", options: ["MTV/MVT", "Only MVC", "Only MVVM", "None"], answer: "MTV/MVT" },
    { id: "q17", question: "Which file is project settings?", options: ["settings.py", "urls.py", "views.py", "models.py"], answer: "settings.py" },
    { id: "q18", question: "Which is Django's main advantage?", options: ["Rapid development", "Slow development", "No security", "No backend"], answer: "Rapid development" },
    { id: "q19", question: "Which command creates app?", options: ["python manage.py startapp", "django app create", "start app django", "make app"], answer: "python manage.py startapp" },
    { id: "q20", question: "Django uses which language?", options: ["Python", "Java", "C", "PHP"], answer: "Python" },
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
        subject: "Django",
        score,
        total: questions.length,
        percentage,
      }),
    });

    navigate("/result", {
      state: {
        subject: "Django",
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
        <h1>Django Test</h1>

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

export default DjangoTest;