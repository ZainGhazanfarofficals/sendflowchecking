import React, { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";

const HandlingData = ({ onSendEmail, email: propEmail, appPassword: propAppPassword, subject: propSubject, body: propBody }) => {
  const [email, setEmail] = useState(propEmail);
  const [appPassword, setAppPassword] = useState(propAppPassword);
  const [subject, setSubject] = useState(propSubject);
  const [body, setBody] = useState(propBody);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setEmail(propEmail);
    setAppPassword(propAppPassword);
    setSubject(propSubject);
    setBody(propBody);
  }, [propEmail, propAppPassword, propSubject, propBody]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAppPasswordChange = (e) => {
    setAppPassword(e.target.value);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSendEmail = async () => {
    if (!email || !appPassword || !subject || !body) {
      setError('Please fill in all required fields.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    try {
      onSendEmail({ subject, body, email, appPassword });
      setSuccessMessage('Email setup successfully.');
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while setting up');
    }
  };

  return (
    <div>
      <div>
        <label>Your Email:</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          placeholder="App Password"
          value={appPassword}
          onChange={handleAppPasswordChange}
        />
        <br />
        <a
          href="https://myaccount.google.com/apppasswords"
          target="_blank"
          rel="noopener noreferrer"
        >
          Generate App Password here!
        </a>
        <br />
        <br />
      </div>

      <div>
        <label>Email Subject:</label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={handleSubjectChange}
        />
        <br />
        <br />

        <label>Email Body:</label>
        <textarea
          rows="5"
          placeholder="Hey {name}, Love what you're doing for the {other} business at {company}"
          value={body}
          onChange={handleBodyChange}
        />
        <button onClick={handleSendEmail}>Setup Email</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {isSuccessModalOpen && (
          <SuccessModal
            SuccessMessage={successMessage}
            onClose={handleCloseSuccessModal}
          />
        )}
      </div>
    </div>
  );
};

export default HandlingData;
