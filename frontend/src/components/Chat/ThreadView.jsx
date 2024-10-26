// src/components/Chat/ThreadView.jsx
import React, { useState } from "react";
import api from "../../utils/api";
import MessageInput from "./MessageInput";

const ThreadView = ({ thread }) => {
  const [messages, setMessages] = useState(thread.messages);

  const addMessage = async (content) => {
    try {
      const { data } = await api.post(`/chat/threads/${thread._id}/message`, {
        content,
        sender: "user",
      });
      setMessages(data.messages);
    } catch (error) {
      console.error("Failed to send message");
    }
  };

  return (
    <div>
      <h3>{thread.title}</h3>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            {msg.sender === "user" ? "You" : "Bot"}: {msg.content}
          </p>
        ))}
      </div>
      <MessageInput onSendMessage={addMessage} />
    </div>
  );
};

export default ThreadView;
