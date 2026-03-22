// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';

const exams = ["UPSC", "RRB", "UGC-NET", "SSC", "GATE", "Interview", "Placement"];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <Link
            key={exam}
            to={`/exam/${exam.toLowerCase()}`}
            className="p-4 bg-white shadow rounded hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold">{exam}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
