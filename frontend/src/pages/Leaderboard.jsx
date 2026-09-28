import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/leaderboard/")
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      <div className="progress-container">

        <h1>🏆 Leaderboard</h1>

        <table className="leaderboard-table">

          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Tests Completed</th>
              <th>Average Score</th>
            </tr>
          </thead>

          <tbody>

            {leaders.map((item) => (

              <tr key={item.rank}>

<td>
  {item.rank === 1 && "🥇 "}
  {item.rank === 2 && "🥈 "}
  {item.rank === 3 && "🥉 "}
  {item.rank}
</td>

                <td>{item.student}</td>

                <td>{item.completed}</td>

                <td>{item.average}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Leaderboard;