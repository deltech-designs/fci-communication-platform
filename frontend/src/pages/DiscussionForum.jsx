// src/components/DiscussionForum.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext
import { createThread, fetchThreads } from "../utils/api"; // Import API functions

const DiscussionForum = () => {
  // Component state
  const [threads, setThreads] = useState([]); // Stores the list of threads
  const [newThread, setNewThread] = useState(""); // Stores the new thread content

  // Access the token from AuthContext
  const { token } = useContext(AuthContext);

  // Fetch threads from API when the component mounts
  useEffect(() => {
    const loadThreads = async () => {
      try {
        const response = await fetchThreads(); // Fetch threads from API
        setThreads(response.data); // Update the threads state
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };
    loadThreads();
  }, []);

  // Add a new thread to the discussion
  const handleAddThread = async () => {
    // Check if the user is authenticated
    if (!token) {
      alert("Please log in to add a thread.");
      return;
    }

    try {
      const response = await createThread(newThread, token); // API call to add the new thread
      setThreads([...threads, response.data]); // Add the new thread to the state
      setNewThread(""); // Clear the input field
    } catch (error) {
      console.error("Failed to add thread:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Discussion Forum</h2>

      {/* New Thread Input */}
      <div>
        <input
          type="text"
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
          placeholder="Add a new thread"
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddThread}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Thread
        </button>
      </div>

      {/* Display Threads */}
      <div className="mt-4">
        {threads.map((thread) => (
          <div key={thread._id} className="p-2 border-b">
            {thread.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
