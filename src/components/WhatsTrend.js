import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import "../components/WhatsTrend.css";
import { Link } from "react-router-dom";

const client = createClient({
  space: "j389y3dfrbxy",
      environment: "master",
      accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
});


function getCurrentDate() {
  const now = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return now.toLocaleDateString("en-US", options);
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

function WhatsTrend() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchContentfulData() {
      try {
        const response = await client.getEntries({
          content_type: "trend", // Replace with your Content Type ID
        });
        setArticles(response.items);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    }
    fetchContentfulData();
  }, []);

  return (
    <div>
      <div className="top_headd">
        <h1>Whats Trending</h1>
      </div>
      <div className="trend">
        {articles.map((article) => (
          <div key={article.sys.id} className="card_trend">
            <div className="card__body">
              <img
                className="card__image"
                src={article.fields.image.fields.file.url}
                alt=""
              />
               <h2 className="card__title">
                {truncateText(article.fields.title, 50)}
              </h2>
              <p className="card__description">
                {truncateText(article.fields.description, 100)}
              </p>
              <p className="date_trend">{getCurrentDate()}</p>
            </div>
            <Link
              to={`/blog/${article.sys.id}`} // Adjust the route path as needed
              className="card__link"
            >
              Read Full Article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatsTrend;
