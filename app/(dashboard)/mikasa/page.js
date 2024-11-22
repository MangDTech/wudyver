'use client';

import { useState } from "react";
import { Card, Form, Button, Alert, Image } from "react-bootstrap";

const ChatBubble = ({ message, isUser }) => (
  <div className={`d-flex ${isUser ? "justify-content-end" : "justify-content-start"} mb-2`}>
    {!isUser && (
      <div className="me-2">
        <Image
          src="/img/image.jpeg"
          alt="Mikasa Icon"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
            marginTop: "5px",
            animation: "pulse 1s infinite",
          }}
        />
      </div>
    )}
    <div
      style={{
        maxWidth: "75%",
        padding: "10px 15px",
        borderRadius: "15px",
        backgroundColor: isUser ? "#dcf8c6" : "#fff",
        color: isUser ? "#000" : "#000",
        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
        animation: "fadeIn 0.5s",
      }}
    >
      {message}
    </div>
  </div>
);

const fetchMikasaResponse = async (message) => {
  try {
    const res = await fetch(`/api/ai/mikasa?prompt=${encodeURIComponent(message)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Mikasa tidak memiliki respons.";
  } catch (error) {
    console.error("Error fetching Mikasa response:", error.message);
    return "Terjadi kesalahan. Coba lagi nanti.";
  }
};

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { message: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    const mikasaResponse = await fetchMikasaResponse(input);
    const mikasaMessage = { message: mikasaResponse, isUser: false };
    setMessages((prev) => [...prev, mikasaMessage]);

    setInput("");
  };

  return (
    <Card className="m-5 shadow-lg" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Card.Body>
        <Card.Title className="text-center mb-3">Chat dengan Mikasa</Card.Title>
        <div
          style={{
            height: "400px",
            overflowY: "auto",
            padding: "10px",
            backgroundColor: "#ece5dd",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg.message} isUser={msg.isUser} />
            ))
          ) : (
            <Alert variant="info" className="text-center">
              Mulai percakapan dengan Mikasa!
            </Alert>
          )}
        </div>
        <Form onSubmit={handleSend} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              borderRadius: "20px",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0",
            }}
          />
          <Button
            type="submit"
            style={{
              borderRadius: "20px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: "#34b7f1",
              border: "none",
            }}
          >
            Kirim
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
