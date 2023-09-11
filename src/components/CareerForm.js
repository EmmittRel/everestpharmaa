import React, { useState } from "react";
import axios from "axios";
import { createClient } from "contentful-management";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/ContactFocus.css";

function CareerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    educationalQualification: "",
    experience: "",
    currentLocation: "",
    resume: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    const client = createClient({
      accessToken: "CFPAT-9HwqY_yGgGVLjJE-hy8D0ugu3iGXmHmACMx0cOatFPc",
    });
  
    try {
      const space = await client.getSpace("j389y3dfrbxy");
      const environment = await space.getEnvironment("master");
  
      const asset = await environment.createAsset({
        fields: {
          title: { "en-US": file.name },
          file: {
            "en-US": {
              contentType: file.type,
              fileName: file.name,
              upload: file,
            },
          },
        },
      });
  
      const uploadedAsset = await asset.processForAllLocales();
      const resume = uploadedAsset.sys.id;
  
      console.log("Uploaded Asset ID:", resume); // Log the asset ID
  
      // Update the form data directly
      const updatedFormData = {
        ...formData,
        resume: {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: resume,
            },
          },
        },
      };
  
      setFormData(updatedFormData);
    } catch (error) {
      console.error("Error uploading asset:", error);
      // Handle error, show error message, etc.
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const client = createClient({
      accessToken: "CFPAT-9HwqY_yGgGVLjJE-hy8D0ugu3iGXmHmACMx0cOatFPc",
    });
  
    try {
      const space = await client.getSpace("j389y3dfrbxy");
      const environment = await space.getEnvironment("master");
  
      const entry = await environment.createEntry("careerForm", {
        fields: {
          fullName: { "en-US": formData.fullName },
          email: { "en-US": formData.email },
          contactNumber: { "en-US": parseInt(formData.contactNumber) },
          educationalQualification: { "en-US": formData.educationalQualification },
          experience: { "en-US": formData.experience },
          currentLocation: { "en-US": formData.currentLocation },
          resume: {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Asset",
                id: formData.resume, // Use the Asset ID obtained from uploading
              },
            },
          },
        },
      });
      // Entry creation successful
      toast.success('Entry created successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
  
      // Clear the form data
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        educationalQualification: "",
        experience: "",
        currentLocation: "",
        resume: "",
      });
    } catch (error) {
      console.error("Error creating entry:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <div className="contact_career">
        <div className="contain">
          <main className="row">
            <div className="col right" id="section2">
            <form className="message_form" onSubmit={handleSubmit}>
            <div className="input_item half_width">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Full Name</label>
                </div>

                <div className="input_item half_width">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                </div>
                <div className="input_item half_width">
                  <input
                    type="phone"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Contact Number</label>
                </div>

                <div className="input_item half_width">
                  <input
                    type="text"
                    name="educationalQualification"
                    value={formData.educationalQualification}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Educational Qualification</label>
                </div>
                <div className="input_item half_width">
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    
                  />
                  <label>Experience (If Any)</label>
                </div>
                <div className="input_item half_width">
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Current Location</label>
                </div>
                <div className="input_item half_width">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                  />
                  <label>Upload Resume</label>
                </div>
                <div className="input_item full_width" id="send">
                  <button type="submit">Submit Information</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CareerForm;
