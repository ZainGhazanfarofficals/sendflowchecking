"use client"

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import HandlingData from '@/components/email component/HandlingData';
import ExcelImport from '@/components/email component/ExcelImport';
import Schedule from '@/components/email component/Schedule'
import SuccessModal from "@/components/email component/SuccessModal";
import FailedModal from "@/components/email component/FailedModal";
import axios from "axios";
import Analytics from '@/components/email component/Analytics';
import { useSession } from 'next-auth/react';

function CreateCampaign({
  email,
  setEmail,
  appPassword,
  setAppPassword,
  subject,
  setSubject,
  body,
  setBody,
  tableData,
  setTableData,
  dateInfo,
  setdateInfo,
  file,
  setfile,
  setSchedule,
  schedule,
  id,
  setid,
}) {
  const { data: user } = useSession();
  const mail = user.user.email;

  const [cid, setcid] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const [filename, setfilename] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [FailedMessage, setFailedMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCloseFailedModal = () => {
    setIsFailedModalOpen(false);
  };

  const sendEmailDataToApi = async (e) => {
    e.preventDefault();

    if (!email || !appPassword || !subject || !body || !dateInfo || tableData.length === 0) {
      setError('Please fill in all required fields.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    const scheduled = dateInfo;

    try {
      const authResponse = await axios.post('/api/auth', {
        email,
        appPassword,
      });

      if (authResponse.status === 200) {
        setError('');
        setSuccessMessage('Authentication Approved.');
        setIsSuccessModalOpen(true);
      } else {
        setFailedMessage("Email Not Sent. Authenticate Yourself Again")
        setIsFailedModalOpen(true);
        return;
      }

      const res = await axios.post('api/campaign', {
        subject,
        body,
        email,
        appPassword,
        excelFile: filename,
        schedulingData: scheduled,
        mail
      })

      if (res.status === 200) {
        id = await res.data.campaign._id;
        setError('');
        setSuccessMessage('Campaign Stored successfully.');
        setIsSuccessModalOpen(true);
        console.log("successful", id)
        setcid(id)
      } else {
        console.error('Campaign failed.');
      }

      const response1 = await axios.post('/api/api_four', {
        subject,
        body,
        email,
        appPassword,
        data: tableData,
        dateInfo,
        id,
        mail
      });

      if (response1.status === 200) {
        setError('');
        setSuccessMessage('Campaign Sent successfully.');
        setIsSuccessModalOpen(true);
      } else {
        console.error('Error:', response1.data);
        setError('An error occurred while sending data.');
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setFailedMessage("Email Not Sent. Authenticate Yourself Again")
      setIsFailedModalOpen(true);
    }
  };

  const dateInfofun = (date) => {
    if (!date) {
      setError("Please Give Date & Time");
      return;
    }

    setdateInfo(date)

    console.log('Date & time received in CreateCampaign:', date);
  }

  const handleSendEmail = (emailData) => {
    const { email, appPassword, subject, body } = emailData;
    if (!email || !appPassword || !subject || !body) {
      setError("Please fill in all required fields.");
      return;
    }
    setEmail(email);
    setAppPassword(appPassword);
    setBody(body);
    setSubject(subject);
  };

  const handleTableDataChange = (tableData, uploadedFilename) => {
    if (tableData.length === 0) {
      setError("Please Upload File");
      return;
    }

    setTableData(tableData);
    setfilename(uploadedFilename);
    console.log('Table data received in CreateCampaign:', tableData);
    console.log('Uploaded filename:', uploadedFilename);
  };

  const renderCreateButton = () => {
    if (activeTab === 'Email') {
      return (
        <button
          onClick={sendEmailDataToApi}
        >
          Send
        </button>
      );
    } else {
      return null;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <Analytics id={id} cid={cid} />;
      case 'Email':
        return <HandlingData onSendEmail={handleSendEmail} email={email} appPassword={appPassword} subject={subject} body={body} />;
      case 'Leads':
        return <div><ExcelImport onTableDataChange={(tableData, filenameFromResponse) => handleTableDataChange(tableData, filenameFromResponse)} tableData={tableData} file={file} /> </div>;
      case 'Schedule':
        return <Schedule takedateInfo={dateInfofun} dateInfo={dateInfo} schedule={schedule} />;
      case 'Others':
        return <div>Others Content</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabClick('Analytics')}>Analytics</button>
        <button onClick={() => handleTabClick('Email')}>Email</button>
        <button onClick={() => handleTabClick('Leads')}>Leads</button>
        <button onClick={() => handleTabClick('Schedule')}>Schedule</button>
        <button onClick={() => handleTabClick('Others')}>Others</button>
      </div>

      <div>
        {renderTabContent()} <br />
      </div>
      <div>{renderCreateButton()}</div><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isSuccessModalOpen && (
        <SuccessModal
          SuccessMessage={successMessage}
          onClose={handleCloseSuccessModal}
        />
      )}
      {isFailedModalOpen && (
        <FailedModal
          FailedMessage={FailedMessage}
          onClose={handleCloseFailedModal}
        />
      )}
    </div>
  );
}

export default CreateCampaign;
