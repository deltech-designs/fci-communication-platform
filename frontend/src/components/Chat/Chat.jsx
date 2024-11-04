// src/components/Chat/ChatDashboard.js
import React, { useState, useEffect } from "react";
import ThreadList from "./ThreadList";
import ThreadView from "./ThreadView";
import NewThreadForm from "./NewThreadForm";
import { fetchThreads } from "../../api/api";

const ChatDashboard = ({ onLogout }) => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const { data } = await fetchThreads();
        setThreads(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadThreads();
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 p-4 bg-gray-800 text-white">
        <button
          onClick={onLogout}
          className="w-full mb-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
        <ThreadList threads={threads} onSelectThread={setSelectedThread} />
      </aside>
      <main className="flex-1 p-4">
        {selectedThread ? (
          <ThreadView thread={selectedThread} />
        ) : (
          <p className="text-gray-500">Select a thread to start chatting</p>
        )}
      </main>
      <aside className="w-1/4 p-4 bg-gray-100">
        <NewThreadForm onCreateThread={(thread) => setSelectedThread(thread)} />
      </aside>
    </div>
  );
};

export default ChatDashboard;
