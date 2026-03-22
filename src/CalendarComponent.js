import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css"; // We'll put custom styles here

function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [note, setNote] = useState("");

  // Load saved events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  // Update note when date changes
  useEffect(() => {
    const dateKey = date.toDateString();
    setNote(events[dateKey] || "");
  }, [date, events]);

  // Save event
  const handleSave = () => {
    const dateKey = date.toDateString();
    const updatedEvents = { ...events, [dateKey]: note };
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    alert("Event saved!");
  };

  // Reset event
  const handleReset = () => {
    const dateKey = date.toDateString();
    const updatedEvents = { ...events };
    delete updatedEvents[dateKey];
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setNote("");
    alert("Event reset!");
  };

  // Add a star marker for dates with notes
  const tileContent = ({ date, view }) => {
    const dateKey = date.toDateString();
    if (view === "month" && events[dateKey]) {
      return <span className="star-marker">⭐</span>;
    }
    return null;
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", textAlign: "center" }}>
      <h2> My Calendar</h2>

      <Calendar
        value={date}
        onChange={setDate}
        className="my-calendar"
        tileContent={tileContent}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Date: {date.toDateString()}</h3>
        <textarea
          rows="4"
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
            fontSize: "1rem",
          }}
        />
        <br />

        <button
          onClick={handleSave}
          style={{
            margin: "10px",
            padding: "10px 20px",
            borderRadius: "6px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Save
        </button>
        <button
          onClick={handleReset}
          style={{
            margin: "10px",
            padding: "10px 20px",
            borderRadius: "6px",
            background: "#f44336",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>Saved Notes</h3>
        {Object.keys(events).length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <ul>
            {Object.entries(events).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CalendarComponent;
