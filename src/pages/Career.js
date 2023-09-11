import React, { useState, useEffect } from "react";
import "../components/Career.css";
import Banner from "../components/Banner";
import { createClient } from "contentful";
import Footer from "../components/Footer";
import CareerForm from "../components/CareerForm";
// import Contact from "../components/Contact"; // Import the Contact component

function Career() {
  const [positions, setPositions] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false); // State to show the Contact form
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Create a Contentful client
    const client = createClient({
      space: "j389y3dfrbxy",
      environment: "master",
      accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
    });

    // Fetch data from Contentful
    const fetchData = async () => {
      try {
        const response = await client.getEntries({
          content_type: "career",
        });

        // Set the fetched positions in the state
        setPositions(response.items);
      } catch (error) {
        console.log("Error retrieving Contentful data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Banner
        backgroundImage={"https://i.ibb.co/JkvD8Nq/3.png"}
        title="Career"
      />
      <header className="head_career_form">
        <p>Fill the form with valid information and you will be contacted back soon.</p>
      </header>
      
      {showContactForm ? (
        <CareerForm /> // Show Contact form if showContactForm is true
      ) : (
        <CareerForm /> // Show CareerForm if showContactForm is false
      )}

      {positions.length > 0 && (
        <main className="wrap">
          <div className="head_career">Available Job Position</div>
          <section className={`positions${positions.length === 0 ? " center" : ""}`}>
            {positions.map((career) => (
              <article className={`position position--${career.fields.slug}`} key={career.sys.id}>
                <header className="head">
                  <h3 className="position__name">
                    <span className="psn">Position Available:</span> {career.fields.name}
                  </h3>
                </header>
                <header className="head">
                  <h3 className="position__name">
                    <span className="psn">No. of Position:</span> {career.fields.openPositions}
                  </h3>
                </header>
                <a href="#" className="btn" onClick={() => setShowContactForm(true)}>
                  Send Here
                </a>
              </article>
            ))}
          </section>

          <footer className="foot">
            <p>Note: Click the button and it will be directed to above form and send the information and wait for our response.</p>
          </footer>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default Career;
