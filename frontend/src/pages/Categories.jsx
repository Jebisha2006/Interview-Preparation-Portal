import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function Categories() {
  return (
    <>
      <Navbar />

      <div className="categories">
        <h1>Choose a Category</h1>

        <div className="category-grid">

          <div className="category-card">
            <h3>Aptitude</h3>
            <Link to="/aptitude-test">
              <button>Start Test</button>
            </Link>
          </div>

          <div className="category-card">
            <h3>Python</h3>
            <Link to="/python-test">
              <button>Start Test</button>
            </Link>
          </div>

          <div className="category-card">
            <h3>Java</h3>
            <Link to="/java-test">
              <button>Start Test</button>
            </Link>
          </div>

          <div className="category-card">
            <h3>DBMS</h3>
            <Link to="/dbms-test">
              <button>Start Test</button>
            </Link>
          </div>

          <div className="category-card">
            <h3>Operating System</h3>
            <Link to="/os-test">
              <button>Start Test</button>
            </Link>
          </div>

          <div className="category-card">
            <h3>Computer Networks</h3>
            <Link to="/cn-test">
              <button>Start Test</button>
            </Link>
          </div>
          <div className="category-card">
  <h3>DSA</h3>
  <Link to="/dsa-test">
    <button>Start Test</button>
  </Link>
</div>
<div className="category-card">
  <h3>React</h3>
  <Link to="/react-test">
    <button>Start Test</button>
  </Link>
</div>
<div className="category-card">
  <h3>Web Development</h3>
  <Link to="/web-test">
    <button>Start Test</button>
  </Link>
</div>
<div className="category-card">
  <h3>Django</h3>
  <Link to="/django-test">
    <button>Start Test</button>
  </Link>
</div>
<div className="category-card">
  <h3>SQL Advanced</h3>
  <Link to="/sql-test">
    <button>Start Test</button>
  </Link>
</div>
<div className="category-card">
  <h3>HR Interview</h3>
  <Link to="/hr-test">
    <button>Start Test</button>
  </Link>
</div>

        </div>
      </div>
    </>
  );
}

export default Categories;