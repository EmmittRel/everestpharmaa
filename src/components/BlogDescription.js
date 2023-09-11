import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "../components/BlogDescription.css";
import Footer from "./Footer";

dayjs.extend(relativeTime);

const client = createClient({
  space: "j389y3dfrbxy",
  environment: "master",
  accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
});

function BlogDescription({ match }) {
  const blogId = match.params.id;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await client.getEntry(blogId);
        if (response) {
          setBlog(response.fields);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;}
  
  const currentDate = dayjs().format("MMMM D, YYYY");

  return (
    <div>
      <div className="structure">
        <header className="headerr">
          <div className="header-image">
            <img
              src={blog.image?.fields?.file?.url}
              alt="blog image"
            />
          </div>
          <h1>{blog.title}</h1>
          <div className="meta">
            {/* <p className="text_small">Published</p> */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M7,8V6H5V19H19V6H17V8H7M9,4A3,3 0 0,1 12,1A3,3 0 0,1 15,4H19A2,2 0 0,1 21,6V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V6A2,2 0 0,1 5,4H9M12,3A1,1 0 0,0 11,4A1,1 0 0,0 12,5A1,1 0 0,0 13,4A1,1 0 0,0 12,3Z"></path>
            </svg>
            <p className="card__timestamp">
            {currentDate}
            </p>{" "}
            {/* <img src="" alt="" /> */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"></path>
            </svg>
            <p className="text_small">Published By: Everest Pharmaceuticals</p>
          </div>
          <hr />
        </header>
        <main className="content">
          <div
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default BlogDescription;
