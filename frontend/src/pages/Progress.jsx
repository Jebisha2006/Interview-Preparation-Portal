import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";
import { jsPDF } from "jspdf";

function Progress() {

  const [progress, setProgress] = useState([]);

  const TOTAL_TESTS = 12;

  useEffect(() => {

    const student_id = localStorage.getItem("student_id");

    fetch(`http://127.0.0.1:8000/api/progress/${student_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProgress(data);
      });

  }, []);

  const downloadFinalCertificate = () => {

    const doc = new jsPDF("landscape");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const name = localStorage.getItem("student_name") || "Student";

    // ===========================
    // Double Border
    // ===========================
    doc.setDrawColor(13, 71, 161);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.6);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // ===========================
    // Title
    // ===========================
    doc.setTextColor(13, 71, 161);
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("FINAL COMPLETION CERTIFICATE", pageWidth / 2, 35, {
      align: "center",
    });

    doc.setFontSize(16);
    doc.text("Interview Preparation Portal", pageWidth / 2, 48, {
      align: "center",
    });

    // ===========================
    // Student Name
    // ===========================
    doc.setFont("times", "normal");
    doc.setFontSize(15);
    doc.text("This Certificate is Proudly Presented To", pageWidth / 2, 68, {
      align: "center",
    });

    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.setTextColor(184, 134, 11);
    doc.text(name.toUpperCase(), pageWidth / 2, 84, {
      align: "center",
    });

    // ===========================
    // Body
    // ===========================
    doc.setFont("times", "normal");
    doc.setFontSize(15);
    doc.setTextColor(60);

    doc.text(
      "For Successfully Completing All Interview Assessments",
      pageWidth / 2,
      105,
      { align: "center" }
    );

    doc.text(
      `Completed Tests : ${progress.length}/${TOTAL_TESTS}`,
      pageWidth / 2,
      120,
      { align: "center" }
    );

    doc.text(
      "Congratulations! We wish you success in your future career.",
      pageWidth / 2,
      135,
      { align: "center" }
    );

    doc.text(
      `Date : ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      150,
      { align: "center" }
    );

    // ===========================
    // Signature
    // ===========================
    doc.line(35, 175, 85, 175);
    doc.text("Project Guide", 60, 182, {
      align: "center",
    });

    doc.line(pageWidth - 85, 175, pageWidth - 35, 175);
    doc.text("Project Coordinator", pageWidth - 60, 182, {
      align: "center",
    });

    doc.save("Final_Certificate.pdf");
  };

  return (
    <>
      <Navbar />

      <div className="progress-container">

        <h1>My Progress</h1>

        <div className="progress-grid">

          {progress.length > 0 ? (

            progress.map((item, index) => (

              <div className="progress-card" key={index}>

                <h3>{item.subject}</h3>

                <p>
                  Score : {item.score}/{item.total}
                </p>

                <p>
                  Percentage : {item.percentage}%
                </p>

              </div>

            ))

          ) : (

            <h3>No Tests Attempted Yet</h3>

          )}

        </div>

        {/* Final Certificate */}

        {progress.length === TOTAL_TESTS && (

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
            }}
          >

            <h2 style={{ color: "green" }}>
              🎉 Congratulations!
            </h2>

            <p>
              You have successfully completed all {TOTAL_TESTS} assessments.
            </p>

            <button
              className="submit-btn"
              onClick={downloadFinalCertificate}
            >
              🎓 Download Final Certificate
            </button>

          </div>

        )}

      </div>

    </>
  );
}

export default Progress;