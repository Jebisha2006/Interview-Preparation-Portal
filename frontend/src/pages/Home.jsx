import "../styles/style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <nav className="navbar">
        <h2>Interview Prep Portal</h2>

        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <h1>Prepare For Your Dream Job</h1>

        <p>
          Practice Aptitude, Technical MCQs and Mock Interviews
        </p>

        <button>Get Started</button>
      </section>

      <section className="features">
        <div className="card">
          <h3>Aptitude Tests</h3>
          <p>Practice aptitude questions.</p>
        </div>

        <div className="card">
          <h3>Technical MCQs</h3>
          <p>Python, Java, DBMS and more.</p>
        </div>

        <div className="card">
          <h3>Mock Interviews</h3>
          <p>Improve confidence and communication.</p>
        </div>

        <div className="card">
          <h3>Progress Tracking</h3>
          <p>Track your performance.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;