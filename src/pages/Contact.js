import React, { useState } from "react";
import { createClient } from "contentful-management";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Contact.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!firstName || !lastName || !email || !contactNumber) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Create a Contentful management client
    const client = createClient({
      accessToken: "CFPAT-9HwqY_yGgGVLjJE-hy8D0ugu3iGXmHmACMx0cOatFPc",
    });

    try {
      // Create an entry in Contentful
      const entry = await client
        .getSpace("j389y3dfrbxy")
        .then((space) =>
          space.getEnvironment("master").then((environment) =>
            environment.createEntry("contact", {
              fields: {
                firstName: { "en-US": firstName },
                lastName: { "en-US": lastName },
                email: { "en-US": email },
                contactNumber: { "en-US": contactNumber },
                message: { "en-US": message },
              },
            })
          )
        );

      console.log("Entry created successfully:", entry);

      // Reset the form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setContactNumber("");
      setMessage("");

      // Show toast notification
      toast.success('Entry created successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } catch (error) {
      console.log("Error creating entry in Contentful:", error);
    }
  };

  return (
    <div>
      <Banner
        backgroundImage={"https://i.ibb.co/b5wrbQ8/4-1-1.png"}
        title="Contact Us"
      />
      <div className="contains">
        <div className="innerwrap">
          <section className="section2 clearfix">
            <div className="col2 column1 first">
            {/* <div className="sec2innercont"> */}
            
              {/* Google Maps */}
              <iframe className="map_map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d883.2051025255724!2d85.295944!3d27.691945!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19736c3e8875%3A0xaf422d493363b373!2sEverestpharmaceuticals%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1692209594013!5m2!1sen!2snp"
                width="550"
                height="600"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* </div> */}
            <div className="col2 column2 last">
              <div className="sec2innercont">
                {/* <div className="sec2top"> */}
                  <div className="sec2addr">
                    <h3>Our Office Location</h3>
                    <p>
                      <span className="collig">Tel :</span> +977-01-5386780 , 5378441
                    </p>
                    <p>
                      <span className="collig">Address :</span> 2nd floor, DKM HOUSE, (Tinkune Marg-82) Kuleshwor Height, Naya Basti, Kathmandu, Nepal
                    </p>
                  </div>
    
                </div>
                <div className="sec2contactform">
                  <h3 className="sec2frmtitle">Want to Know More? Drop Us Your Queries</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="clearfix">
                      <input
                        className="col2 first"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                      />
                      <input
                        className="col2 last"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="clearfix">
                      <input
                        className="col2 first"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <input
                        className="col2 last"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Contact Number"
                      />
                    </div>
                    <div className="clearfix">
                      <textarea
                        name="textarea"
                        id=""
                        cols="30"
                        rows="7"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    <div className="clearfix">
                      <input type="submit" value="Send" />
                    </div>
                  </form>
                </div>
              </div>
            {/* </div> */}
          </section>
        </div>
      </div>
      <Footer/>
      <ToastContainer />
    </div>
  );
}

export default Contact;
