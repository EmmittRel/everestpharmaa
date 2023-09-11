import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../components/App.css";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const client = createClient({
          space: "j389y3dfrbxy",
          environment: "master",
          accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8"
        });

        const response = await client.getEntries({
          content_type: "slider"
        });

        if (response.items.length === 0) {
          throw new Error("No slides found");
        }

        setSlides(response.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching slides:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="carousel-container">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        dynamicHeight
      >
        {slides.map((slide) => {
          const images = slide.fields.image;
          return images.map((image) => {
            const imageUrl =
              image &&
              image.fields &&
              image.fields.file &&
              image.fields.file.url;
            return (
              <div key={image.sys.id}>
                <img
                  src={imageUrl}
                  alt={slide.fields.title}
                  className="carousel-image"
                />
              </div>
            );
          });
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
