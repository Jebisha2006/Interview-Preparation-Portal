import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    tests_completed: 0,
    average_score: 0,
    categories: 12,
  });

  useEffect(() => {
    const student_id = localStorage.getItem("student_id");

    fetch(`http://127.0.0.1:8000/api/dashboard/${student_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setDashboard({
          ...data,
          categories: 12,
        });
      });
  }, []);

  // ================= Chart =================

  const chartData = {
    labels: ["Tests", "Average %", "Categories"],
    datasets: [
      {
        label: "Student Statistics",
        data: [
          dashboard.tests_completed,
          dashboard.average_score,
          dashboard.categories,
        ],
        backgroundColor: [
          "#1565C0",
          "#43A047",
          "#FB8C00",
        ],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <h1>Student Dashboard</h1>

        <div className="dashboard-cards">

          <div className="dash-card">
            <h2>{dashboard.tests_completed}</h2>
            <p>Tests Completed</p>
          </div>

          <div className="dash-card">
            <h2>{dashboard.average_score}%</h2>
            <p>Average Score</p>
          </div>

          <div className="dash-card">
            <h2>{dashboard.categories}</h2>
            <p>Categories</p>
          </div>

        </div>

        {/* Performance Chart */}

        <div
          style={{
            width: "80%",
            margin: "40px auto",
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#0d47a1",
            }}
          >
            📊 Performance Overview
          </h2>

          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <button
            className="submit-btn"
            onClick={() => navigate("/progress")}
          >
            📈 View Progress
          </button>

          <button
            className="submit-btn"
            onClick={() => navigate("/leaderboard")}
          >
            🏆 Leaderboard
          </button>
        </div>

      </div>
    </>
  );
}

export default Dashboard;