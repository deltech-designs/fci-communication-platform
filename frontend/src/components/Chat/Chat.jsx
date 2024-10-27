// src/components/Chat/Chat.jsx
import React, { useState } from "react";
import ThreadList from "./ThreadList";
import ThreadView from "./ThreadView";
import NewThreadForm from "./NewThreadForm";

const Chat = ({ user, onLogout }) => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [threads, setThreads] = useState([
    // Sample threads with messages
    {
      id: 1,
      title: "General Discussion",
      messages: [
        { text: "Hello everyone!", user: "Alice" },
        { text: "Hi Alice!", user: "me" },
      ],
    },
  ]);

  const handleSendMessage = (messageText) => {
    if (selectedThread) {
      const updatedThreads = threads.map((thread) => {
        if (thread.id === selectedThread.id) {
          return {
            ...thread,
            messages: [...thread.messages, { text: messageText, user: "me" }],
          };
        }
        return thread;
      });
      setThreads(updatedThreads);

      // Update the selected thread with new messages
      const updatedSelectedThread = updatedThreads.find(
        (thread) => thread.id === selectedThread.id
      );
      setSelectedThread(updatedSelectedThread);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside className="w-1/4 p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold">Welcome, {user.name}</h2>
        <button
          onClick={onLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
        <ThreadList
          threads={threads}
          onSelectThread={(thread) => setSelectedThread(thread)}
        />
      </aside>
      <main className="flex-1 p-4 flex flex-col">
        {selectedThread ? (
          <ThreadView
            thread={selectedThread}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <p className="text-gray-500">Select a thread to start chatting</p>
        )}
      </main>
      <aside className="w-1/4 p-4 bg-gray-100">
        <NewThreadForm
          onCreateThread={(newThread) => {
            setThreads([...threads, newThread]);
            setSelectedThread(newThread);
          }}
        />
      </aside>
    </div>
  );
};

export default Chat;
