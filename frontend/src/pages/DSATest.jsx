import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function DSATest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "q1", question: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: "O(log n)" },
    { id: "q2", question: "Stack follows?", options: ["FIFO", "LIFO", "Random", "None"], answer: "LIFO" },
    { id: "q3", question: "Queue follows?", options: ["FIFO", "LIFO", "Tree", "Graph"], answer: "FIFO" },
    { id: "q4", question: "Which is linear DS?", options: ["Tree", "Graph", "Array", "Heap"], answer: "Array" },
    { id: "q5", question: "DFS uses?", options: ["Stack", "Queue", "Array", "List"], answer: "Stack" },
    { id: "q6", question: "BFS uses?", options: ["Stack", "Queue", "Tree", "Heap"], answer: "Queue" },
    { id: "q7", question: "Linked list memory?", options: ["Contiguous", "Non-contiguous", "Fixed", "Static"], answer: "Non-contiguous" },
    { id: "q8", question: "Binary tree max children?", options: ["1", "2", "3", "4"], answer: "2" },
    { id: "q9", question: "Heap is?", options: ["Tree", "Graph", "Array", "Stack"], answer: "Tree" },
    { id: "q10", question: "Hashing used for?", options: ["Search", "Sort", "Delete", "Insert only"], answer: "Search" },
    { id: "q11", question: "AVL tree is?", options: ["Balanced", "Unbalanced", "Graph", "List"], answer: "Balanced" },
    { id: "q12", question: "Preorder traversal?", options: ["Root Left Right", "Left Right Root", "Right Left Root", "None"], answer: "Root Left Right" },
    { id: "q13", question: "Inorder traversal?", options: ["Left Root Right", "Root Left Right", "Right Root Left", "None"], answer: "Left Root Right" },
    { id: "q14", question: "Postorder traversal?", options: ["Left Right Root", "Root Left Right", "Root Right Left", "None"], answer: "Left Right Root" },
    { id: "q15", question: "Graph uses?", options: ["Nodes & Edges", "Rows", "Tables", "Files"], answer: "Nodes & Edges" },
    { id: "q16", question: "Adjacency matrix used in?", options: ["Graph", "Tree", "Stack", "Queue"], answer: "Graph" },
    { id: "q17", question: "Sorting fastest average?", options: ["Quick Sort", "Bubble", "Selection", "Insertion"], answer: "Quick Sort" },
    { id: "q18", question: "Worst Quick sort?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"], answer: "O(n^2)" },
    { id: "q19", question: "Tree is?", options: ["Non-linear", "Linear", "DB", "File"], answer: "Non-linear" },
    { id: "q20", question: "Graph has?", options: ["Nodes Edges", "Tables", "Rows", "Columns"], answer: "Nodes Edges" },
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
        subject: "DSA",
        score,
        total: questions.length,
        percentage,
      }),
    });

    navigate("/result", {
      state: { subject: "DSA", score, total: questions.length, percentage },
    });
  };

  return (
    <>
      <Navbar />
      <div className="test-container">
        <h1>DSA Test</h1>
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

export default DSATest;