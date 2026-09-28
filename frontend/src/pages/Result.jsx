import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/style.css";
import { jsPDF } from "jspdf";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;
const downloadCertificate = () => {
  const doc = new jsPDF("landscape");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ==========================
  // Double Border
  // ==========================
  doc.setDrawColor(13, 71, 161);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setDrawColor(201, 162, 39);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // ==========================
  // Title
  // ==========================
  doc.setTextColor(13, 71, 161);
  doc.setFont("times", "bold");
  doc.setFontSize(28);
  doc.text("CERTIFICATE OF ACHIEVEMENT", pageWidth / 2, 32, {
    align: "center",
  });

  // ==========================
  // Subtitle
  // ==========================
  doc.setFontSize(16);
  doc.setFont("times", "normal");
  doc.text("Interview Preparation Portal", pageWidth / 2, 45, {
    align: "center",
  });

  // ==========================
  // Presented To
  // ==========================
  doc.setFontSize(15);
  doc.setTextColor(80);
  doc.text("This Certificate is Proudly Presented To", pageWidth / 2, 63, {
    align: "center",
  });

  // ==========================
  // Student Name
  // ==========================
  const studentName =
    localStorage.getItem("student_name") || "Student";

  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.setTextColor(184, 134, 11);
  doc.text(studentName.toUpperCase(), pageWidth / 2, 78, {
    align: "center",
  });

  // Underline
  doc.setDrawColor(184, 134, 11);
  doc.line(90, 82, pageWidth - 90, 82);

  // ==========================
  // Certificate Text
  // ==========================
  doc.setTextColor(60);
  doc.setFont("times", "normal");
  doc.setFontSize(15);

  doc.text(
    "For successfully completing the Interview Assessment",
    pageWidth / 2,
    96,
    { align: "center" }
  );

  doc.text(
    `Subject : ${result.subject}`,
    pageWidth / 2,
    108,
    { align: "center" }
  );

  doc.text(
    `Score : ${result.score} / ${result.total}   (${result.percentage}%)`,
    pageWidth / 2,
    120,
    { align: "center" }
  );

  doc.text(
    "Your dedication, hard work and commitment",
    pageWidth / 2,
    135,
    { align: "center" }
  );

  doc.text(
    "towards learning are sincerely appreciated.",
    pageWidth / 2,
    145,
    { align: "center" }
  );

  // ==========================
  // Date
  // ==========================
  const today = new Date().toLocaleDateString();

  doc.setFontSize(13);
  doc.text(`Date : ${today}`, 25, 180);

  // ==========================
  // Signature Lines
  // ==========================
  doc.line(35, 170, 85, 170);
  doc.text("Project Guide", 60, 176, { align: "center" });

  doc.line(pageWidth - 85, 170, pageWidth - 35, 170);
  doc.text("Project Coordinator", pageWidth - 60, 176, {
    align: "center",
  });

  // ==========================
  // Footer
  // ==========================
  doc.setFontSize(12);
  doc.setTextColor(120);

  doc.text(
    "Congratulations! We wish you all the best for your future career.",
    pageWidth / 2,
    190,
    { align: "center" }
  );

  doc.save("Certificate.pdf");
};

  useEffect(() => {
    if (result) {
      const progress =
        JSON.parse(localStorage.getItem("progress")) || {};

      progress[result.subject] = {
        score: result.score,
        total: result.total,
        percentage: result.percentage,
      };

      localStorage.setItem(
        "progress",
        JSON.stringify(progress)
      );
    }
  }, [result]);

  if (!result) {
    return (
      <div className="result-container">
        <h2>No Result Found</h2>

        <button
          className="submit-btn"
          onClick={() => navigate("/dashboard")}
        >
          Go To Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-card">

        <h1 className="result-title">🎉 Test Completed</h1>

<h2 className="subject-title">
  {result.subject} Test
</h2>

        <h2>
          Score : {result.score} / {result.total}
        </h2>

        <p>✅ Correct Answers : {result.correct}</p>

        <p>❌ Wrong Answers : {result.wrong}</p>

        <p>📊 Percentage : {result.percentage}%</p>

        <button
          className="submit-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back To Dashboard
        </button>

      </div>
    </div>
  );
}

export default Result;