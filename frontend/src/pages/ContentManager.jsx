import React, { useEffect, useState } from "react";
import {
  fetchContent,
  createContent,
  updateContent,
  deleteContent,
} from "../utils/api";

const ContentManager = ({ user }) => {
  const [contentList, setContentList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentContentId, setCurrentContentId] = useState(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetchContent();
      setContentList(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentData = { title, description };
    try {
      if (editMode) {
        await updateContent(currentContentId, contentData, user.token);
      } else {
        await createContent(contentData, user.token);
      }
      loadContent();
      resetForm();
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleEdit = (content) => {
    setTitle(content.title);
    setDescription(content.description);
    setCurrentContentId(content._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteContent(id, user.token);
      loadContent();
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditMode(false);
    setCurrentContentId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Announcements & Updates</h1>
      {user.role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded"
          >
            {editMode ? "Update" : "Create"}
          </button>
          {editMode && (
            <button onClick={resetForm} className="ml-2 text-red-500">
              Cancel
            </button>
          )}
        </form>
      )}

      <div className="space-y-4">
        {contentList.map((content) => (
          <div key={content._id} className="p-4 border rounded">
            <h2 className="text-xl font-bold">{content.title}</h2>
            <p>{content.description}</p>
            {user.role === "admin" && (
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(content)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
