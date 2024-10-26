import React, { useEffect, useState } from "react";
import { fetchResources } from "../utils/api";

const ResourceLibrary = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState({ type: "", category: "" });

  const loadResources = async () => {
    const response = await fetchResources(filter);
    setResources(response.data);
  };

  useEffect(() => {
    loadResources();
  }, [filter]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Resource Library</h2>

      {/* Filter Options */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filter by type"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 gap-4">
        {resources.map((resource) => (
          <div key={resource._id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{resource.title}</h3>
            <p>Type: {resource.type}</p>
            <p>Category: {resource.category}</p>
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceLibrary;
