import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatBotFull() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(
    JSON.parse(localStorage.getItem("full_chatbot") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("full_chatbot", JSON.stringify(chat));
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message,
      });

      const botMsg = {
        role: "bot",
        content: res.data.reply,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", content: " API Error from server" },
      ]);
    }

    setMessage("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        background: "#fafafa",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>ChatBot Assistant </h2>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          background: "white",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        {chat.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              background: msg.role === "user" ? "#000609ff" : "#0b0101ff",
              padding: "8px",
              borderRadius: "5px",
              margin: "8px 0",
              maxWidth: "80%",
              marginLeft: msg.role === "user" ? "auto" : "0",
            }}
          >
            {msg.content}
          </p>
        ))}
      </div>

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            background: "#000407ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
