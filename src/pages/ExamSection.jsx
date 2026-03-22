// src/pages/ExamSection.jsx
import { useParams } from 'react-router-dom';

export default function ExamSection() {
  const { examId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{examId.toUpperCase()} Section</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded">Materials (PDFs / Videos)</div>
        <div className="p-4 bg-white shadow rounded">Notes</div>
        <div className="p-4 bg-white shadow rounded">Calendar & Reminders</div>
        <div className="p-4 bg-white shadow rounded">Bookmarks</div>
        <div className="p-4 bg-white shadow rounded col-span-1 md:col-span-2">Chatbot (Section-Specific)</div>
      </div>
    </div>
  );
}
