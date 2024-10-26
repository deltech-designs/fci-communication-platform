// src/components/Chat/ThreadList.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const ThreadList = ({ onSelectThread }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await api.get("/chat/threads");
        setThreads(data);
      } catch (error) {
        console.error("Failed to fetch threads");
      }
    };
    fetchThreads();
  }, []);

  return (
    <div>
      <h3>Threads</h3>
      <ul>
        {threads.map((thread) => (
          <li key={thread._id} onClick={() => onSelectThread(thread)}>
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
