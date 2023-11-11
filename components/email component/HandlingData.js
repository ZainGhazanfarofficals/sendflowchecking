"use client";
import React, { useState,useEffect } from "react";
import SuccessModal from "./SuccessModal";

const HandlingData = ({onSendEmail,  email: propEmail, appPassword: propAppPassword, subject: propSubject, body: propBody}) => {
  const [email, setEmail] = useState(propEmail);
  const [appPassword, setAppPassword] = useState(propAppPassword);
  const [subject, setSubject] = useState(propSubject);
  const [body, setBody] = useState(propBody);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    // Update input fields when props change (e.g., switching tabs)
    setEmail(propEmail);
    setAppPassword(propAppPassword);
    setSubject(propSubject);
    setBody(propBody);
  }, [propEmail, propAppPassword, propSubject, propBody]);

  // Function to handle subject input change
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Function to handle email body input change
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  // Function to handle the email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle the app password input change
  const handleAppPasswordChange = (e) => {
    setAppPassword(e.target.value);
  };
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false); // Close the modal
  };


  // Triggered When Click on Setup Email Button
  const handleSendEmail = async () => {
    if (!email || !appPassword || !subject || !body) {
      setError('Please fill in all required fields.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    try {
      // Pass the relevant data to the parent component using the prop function
      onSendEmail({ subject, body, email, appPassword });

      // Clear form fields and display success message
      setSuccessMessage('Email setup successfully.');
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while setting up');
    }
  };

  return (
    <div className="h-auto w-full max-w-[100vh] flex items-center justify-center mt-4 bg-white">
      <div className=" shadow-lg rounded-lg p-10 ">
        <div className="mb-6">
          <label className="block mb-2 text-gray-800 font-bold">
            Authenticate Yourself:
          </label>
          <label className=" mb-2 text-gray-800">Your Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <br />
          <br />
          <label className=" mb-2 text-gray-800">Password:</label>
          <input
            type="password"
            placeholder="App Password"
            value={appPassword}
            onChange={handleAppPasswordChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <br />
          <a
            className=" top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-blue-500 hover:text-blue-600"
            target="_blank"  href="https://myaccount.google.com/apppasswords"
          >
            Generate App Password here!
          </a>
          <br />
          <br />
        </div>

        <div className="mb-4 flex">
          <div className="flex-1 mr-2">
            <label className="block mb-2 text-gray-800 font-bold">
              Write Your Email Here:
            </label>
            <label className="block mb-2 text-gray-800">Email Subject:</label>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={handleSubjectChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <br />
            <br />

            <label className="block mb-2 text-gray-800">Email Body:</label>
            <textarea
              rows="5"
              placeholder="Hey {name},Love what you're doing for the {other} business at {company}"
              value={body}
              onChange={handleBodyChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              className="rounded-lg bg-black text-white hover:bg-gray-800 py-2 px-4 "
              onClick={handleSendEmail}
            >
              Setup Email
            </button>
            
            {error && <p style={{ color: "red" }}>{error}</p>}

            {isSuccessModalOpen && (
              <SuccessModal
                SuccessMessage={successMessage}
                onClose={handleCloseSuccessModal}
              />
            )}
                     
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandlingData;
