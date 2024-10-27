// src/components/Chat/ThreadView.jsx
import React from "react";
import MessageInput from "./MessageInput";

const ThreadView = ({ thread, onSendMessage }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-2xl font-semibold mb-4">{thread.title}</h3>
        <div className="space-y-2">
          {thread.messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.user === "me"
                  ? "bg-indigo-100 text-right"
                  : "bg-gray-200"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ThreadView;
