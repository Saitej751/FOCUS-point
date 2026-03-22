import { useEffect, useState } from "react";

export default function FocusBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(
    JSON.parse(localStorage.getItem("focusbot_chat") || "[]")
  );

  // Minimize state
  const [minimized, setMinimized] = useState(
    JSON.parse(localStorage.getItem("focusbot_minimized") || "false")
  );

  useEffect(() => {
    localStorage.setItem("focusbot_chat", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    localStorage.setItem("focusbot_minimized", JSON.stringify(minimized));
  }, [minimized]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        content: data.reply || " No response from AI",
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", content: " Backend error. Cannot reach AI." },
      ]);
    }

    setMessage("");
  };

  return (
    <>
      {/* Minimized floating button */}
      {minimized && (
        <button
          onClick={() => setMinimized(false)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#007bff",
            color: "white",
            fontSize: "22px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
        >
          
        </button>
      )}

      {/* Full FocusBot chat UI */}
      {!minimized && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "300px",
            background: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {/* Header with minimize button */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>FocusBot </h3>
            <button
              onClick={() => setMinimized(true)}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ▼
            </button>
          </div>

          <div
            style={{
              maxHeight: "250px",
              overflowY: "auto",
              marginBottom: "10px",
              border: "1px solid #ddd",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {chat.map((msg, index) => (
              <p
                key={index}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  background: msg.role === "user" ? "#d0f0ff" : "#eee",
                  padding: "5px",
                  borderRadius: "5px",
                  margin: "5px 0",
                }}
              >
                {msg.content}
              </p>
            ))}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginTop: "5px",
              width: "100%",
              padding: "6px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}
