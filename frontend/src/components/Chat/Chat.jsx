// src/components/Chat/Chat.jsx
import React, { useState, useEffect } from "react";
import { fetchThreads, createThread, addMessage } from "../../api/api";
import { IoIosLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

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

  const handleDelete = async () => {};

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
    <div className="flex gap-4 h-screen bg-gray-100 p-4">
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between gap-4 rounded-lg">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-2xl">FCI</h3>
            <button className="text-white p-2">
              <span className="text-2xl">&#9776;</span>
            </button>
          </div>
          <button
            lassName="bg-gray-600 w-full mt-4 flex items-center py-2 px-4 rounded text-gray-300 hover:bg-gray-700"
            onClick={() => handleCreateThread("New Thread", [user._id])}
          >
            + New Thread
          </button>
          {threads.map((thread) => (
            <div className="space-y-2 mt-4">
              <button
                className="bg-gray-800 w-full py-2 px-4 rounded text-gray-400 text-left truncate hover:bg-gray-700"
                key={thread._id}
                onClick={() => setSelectedThread(thread)}
              >
                {thread.title}
              </button>
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between rounded-md bg-white p-2">
          <div className="flex items-center gap-3 mt-3">
            <FaUserCircle className="text-black" size={35} />
            <div>
              <p className="text-gray-500">Welcome back,</p>
              <p className="text-black font-semibold">{user.name}</p>
            </div>
          </div>
          <IoIosLogOut
            className="text-black cursor-pointer"
            size={25}
            onClick={onLogout}
          />
        </div>
      </aside>
      <main className="flex-1 flex flex-col justify-between bg-white p-6">
        <div className="flex justify-between items-center gap-6 mb-4">
          <div>
            {/* <h4 className="font-semibold text-xl">{selectedThread.title}</h4> */}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button className="text-red-600 text-xl mr-4">&#9888;</button>
              <button className="text-blue-600 text-xl">&#128465;</button>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200 rounded-full px-4 py-2 outline-none"
            />
          </div>
        </div>
        <div>
          {selectedThread && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 justify-start">
                {selectedThread.messages.map((msg) => (
                  <p
                    className="bg-gray-200 text-gray-700 p-4 rounded-lg max-w-xs"
                    key={msg._id}
                  >
                    {msg.content}
                  </p>
                ))}
              </div>
              <div className="flex gap-6">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full border p-4"
                />
                <button className="" onClick={handleSendMessage}>
                  <IoSend size={20} />
                  {/* <span>Send</span> */}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
