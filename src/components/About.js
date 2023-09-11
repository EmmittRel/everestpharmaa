import React, { useEffect, useState } from 'react';
import '../components/About.css';
import * as contentful from 'contentful';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const client = contentful.createClient({
      space: "j389y3dfrbxy",
        environment: "master",
        accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8"
    });

    const fetchAboutData = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'about',
        });

        if (response.items.length > 0) {
          setAboutData(response.items[0].fields);
        }
      } catch (error) {
        console.log('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return null;
  }

  const { title, descrip, imageOne, imageTwo } = aboutData;

  return (
    <div>
      <section className="about section" id="about">
        <div className="about__container container grid">
          <div className="about__data">
            <h2 className="section__title about__title">{title}</h2>
            <p className="about__description">{descrip}</p>
            <a href="/moreabout" className="button">Know More</a>
          </div>

          <div className="about__img">
            <div className="about__img-overlay">
              <img src={imageOne.fields.file.url} alt={imageOne.fields.title} className="about__img-one" />
            </div>

            <div className="about__img-overlay">
              <img src={imageTwo.fields.file.url} alt={imageTwo.fields.title} className="about__img-two" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;