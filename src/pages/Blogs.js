import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../components/Blogs.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

dayjs.extend(relativeTime);

const client = createClient({
  space: "j389y3dfrbxy",
  environment: "master",
  accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
});

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await client.getEntries({
          content_type: "blog",
          limit: 10, // Adjust the limit as per your requirement
        });
        setBlogs(response.items);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const formatTimestamp = (timestamp) => {
    return dayjs(timestamp).fromNow();
  };

  function limitText(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }

  return (
    <div>
      <Banner
        backgroundImage={"https://i.ibb.co/gzWTVb2/2.png"}
        title="Blogs"
      />
      <ol className="cards__container" title="Blog entries">
        {blogs.map((blog, index) => (
          <li className="card" key={blog.sys.id}>
            <div className="card__thumb">
              <img
                className="animate"
                src={blog.fields.image.fields.file.url}
                alt={`Card Image ${index + 1}`}
              />
            </div>
            <div className="card__content">
              <h3 className="card__title">{blog.fields.title}</h3>
              <p className="card__text">
                {limitText(blog.fields.description, 80)}
              </p>
              <p className="card__timestamp">
                Published {formatTimestamp(blog.sys.createdAt)}
              </p>
              <Link
                to={`/blog/${blog.sys.id}`} // Pass the blog ID as a URL parameter
                className="card__btn"
                aria-label={`Read more about ${blog.fields.title}`}
              >
                <img
                  src="https://raw.githubusercontent.com/Javieer57/CODEPEN-gnarly-grid-cards/4a2aca9a4c61126b21ebdbc95119c4620fe61636/assets/arrow-right-solid.svg"
                  alt=""
                />
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <Footer/>
    </div>
  );
}

export default Blogs;
