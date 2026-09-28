import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function Profile() {
  const [student, setStudent] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const student_id = localStorage.getItem("student_id");

    fetch(`http://127.0.0.1:8000/api/profile/${student_id}/`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setFormData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const student_id = localStorage.getItem("student_id");

    const response = await fetch(
      `http://127.0.0.1:8000/api/update-profile/${student_id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    alert(data.message);

    setStudent(formData);
    setEditing(false);
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">
          <h1>👤 My Profile</h1>

          {editing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
              />

              <button
                className="submit-btn"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {student.name}
              </p>

              <p>
                <strong>Email:</strong> {student.email}
              </p>

              <p>
                <strong>Phone:</strong> {student.phone}
              </p>

              <button
                className="submit-btn"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;