import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get("/api/news");
      setNews(response.data);
    };
    fetchNews();
  }, []);

  return (
    <div className="home-page max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">News and Updates</h2>
      {/* {news.map((item) => (
        <div key={item._id} className="news-card mb-4 p-4 border rounded">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p>{item.content}</p>
          <span className="text-gray-500 text-sm">
            {new Date(item.date).toLocaleDateString()}
          </span>
        </div>
      ))} */}
    </div>
  );
};

export default Home;
