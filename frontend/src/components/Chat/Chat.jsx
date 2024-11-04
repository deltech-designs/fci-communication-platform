// src/components/Chat/Chat.jsx
import React, { useState, useEffect } from "react";
import { fetchThreads, createThread, addMessage } from "../../api/api";

const Chat = ({ user, onLogout }) => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const { data } = await fetchThreads();
        setThreads(data);
      } catch (error) {
        console.error("Error loading threads:", error);
      }
    };
    loadThreads();
  }, []);

  const handleCreateThread = async (title, participants) => {
    try {
      const { data } = await createThread(title, participants);
      setThreads([...threads, data]);
      setSelectedThread(data);
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedThread) return;
    try {
      const { data } = await addMessage(selectedThread._id, newMessage);
      setSelectedThread((prev) => ({
        ...prev,
        messages: [...prev.messages, data],
      }));
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <aside className="thread-list">
        <h3>Threads</h3>
        {threads.map((thread) => (
          <button key={thread._id} onClick={() => setSelectedThread(thread)}>
            {thread.title}
          </button>
        ))}
        <button onClick={() => handleCreateThread("New Thread", [user._id])}>
          New Thread
        </button>
      </aside>
      <main className="thread-content">
        {selectedThread && (
          <div>
            <h4>{selectedThread.title}</h4>
            {selectedThread.messages.map((msg) => (
              <p key={msg._id}>{msg.content}</p>
            ))}
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
