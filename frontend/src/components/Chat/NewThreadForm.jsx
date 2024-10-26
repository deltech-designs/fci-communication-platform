// src/components/Chat/NewThreadForm.jsx
import React, { useState } from "react";
import api from "../../utils/api";

const NewThreadForm = ({ onCreateThread }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/chat/threads", { title });
      onCreateThread(data);
      setTitle("");
    } catch (error) {
      console.error("Failed to create thread");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Thread Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default NewThreadForm;
