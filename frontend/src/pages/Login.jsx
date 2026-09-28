import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.message === "Login Successful") {

  localStorage.setItem("student_id", data.student_id);
  localStorage.setItem("student_name", data.name);
  localStorage.setItem("student_email", data.email);
  localStorage.setItem("student_phone", data.phone);

  alert("Login Successful");
  navigate("/dashboard");
}
    else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;