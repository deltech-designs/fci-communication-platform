// src/components/Chat/MessageInput.jsx
import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [content, setContent] = useState("");

  const handleSend = () => {
    onSendMessage(content);
    setContent("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
