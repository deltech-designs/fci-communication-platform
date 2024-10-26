import React, { useEffect, useState } from "react";
import { fetchNews } from "../utils/api";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const response = await fetchNews();
      setNews(response.data);
    };
    loadNews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">News and Updates</h2>

      {/* News Cards */}
      <div className="grid grid-cols-1 gap-4">
        {news.map((newsItem) => (
          <div key={newsItem._id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{newsItem.title}</h3>
            <p>{newsItem.content}</p>
            <span className="text-sm text-gray-500">
              Posted on: {new Date(newsItem.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
