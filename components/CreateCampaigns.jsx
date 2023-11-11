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
})
   {
    const { data:user } = useSession();
    const mail = user.user.email;

  const [cid,setcid] = useState("");
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
    setIsSuccessModalOpen(false); // Close the modal
  };

  const handleCloseFailedModal = () => {
    setIsFailedModalOpen(false); // Close the modal
  };
  

// Function triggered when click on Send Button...
  const sendEmailDataToApi = async (e) => {
    e.preventDefault();
  
  
    // Check for missing or empty fields
    if (!email || !appPassword || !subject || !body || !dateInfo || tableData.length === 0) {
      setError('Please fill in all required fields.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    const scheduled = dateInfo;

    try {
  // API Endpoint to Check Whether the Email/App Password on Which Campaign is to be send are valid or not...
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

// API Endpoint for Storing Data in Campaign DB.
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
        console.log("successfull", id)
        setcid(id)
      } else {
        console.error('Campaign failed.');
      }

      
      // API Endpoint for Sending Mail...
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
  
//HAndling Date and Time Coming From Schedule Component
    const dateInfofun = (date) =>{
      
      if (!date) {
        setError("Please Give Date & Time");
        return;
      }
      
      setdateInfo(date)
      
      console.log('Date & time received in CreateCampaign:', date);
    }

 //Handling Email Body Coming From HandlingData Component   
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
  
//Handling Table Data and Filename  From ExcelImport Component
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

    // Function to Show Send Button When HandlingData(Email) Component is render....
    const renderCreateButton = () => {
      if (activeTab === 'Email') {
        return (
          <button
            className=" rounded-lg bg-black text-white hover:bg-gray-800 py-3 px-20"
            onClick={sendEmailDataToApi}
          >
            Send
          </button>
        );
      } else {
        return null; // Hide the button for other tabs
      }
    };

  // Function for Rendering All Components in TAB form...
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <Analytics id={id} cid={cid}/>;
      case 'Email':
        return <HandlingData onSendEmail={handleSendEmail}
         email={email} // Pass email as prop
        appPassword={appPassword} // Pass appPassword as prop
        subject={subject} // Pass subject as prop
        body={body} />;

      case 'Leads':
        return <div className='mt-4'><ExcelImport onTableDataChange={(tableData,filenameFromResponse) => handleTableDataChange(tableData, filenameFromResponse)} tableData={tableData} file={file}/> </div>;
      case 'Schedule':
        return <Schedule takedateInfo={dateInfofun}  dateInfo={dateInfo} schedule={schedule}/>;
      case 'Others':
        return <div>Others Content</div>;
      default:
        return null;
    }
  };


  return (
  
      <div className=" h-auto w-full max-w-[120vh] ">
        

        <div className="flex justify-center space-x-4 mt-4 ml-10">
          <button className={`rounded-lg px-4 py-2 ${activeTab === 'Analytics' ? 'bg-blue-500' : 'bg-black'} text-white`} onClick={() => handleTabClick('Analytics')}>
            Analytics
          </button>
          <button className={`rounded-lg px-4 py-2 ${activeTab === 'Email' ? 'bg-blue-500' : 'bg-black'} text-white`} onClick={() => handleTabClick('Email')}>
            Email
          </button>
          <button className={`rounded-lg px-4 py-2 ${activeTab === 'Leads' ? 'bg-blue-500' : 'bg-black'} text-white`} onClick={() => handleTabClick('Leads')}>
            Leads
          </button>
          <button className={`rounded-lg px-4 py-2 ${activeTab === 'Schedule' ? 'bg-blue-500' : 'bg-black'} text-white`} onClick={() => handleTabClick('Schedule')}>
            Schedule
          </button>
          <button className={`rounded-lg px-4 py-2 ${activeTab === 'Others' ? 'bg-blue-500' : 'bg-black'} text-white`} onClick={() => handleTabClick('Others')}>
            Others
          </button>
        </div>
        
        <div className="flex justify-center space-x-4 mt-4 ml-40">
        {renderTabContent()} <br />
        
        
        </div>
        <div className='flex justify-center space-x-4 mt-4 ml-40'>{renderCreateButton()}</div><br />
        {error && <p className='flex justify-center space-x-4' style={{ color: "red" }}>{error}</p>} 
        
        
        {isSuccessModalOpen && (
              <SuccessModal
                SuccessMessage={successMessage}
                onClose={handleCloseSuccessModal}
              />
            )}

        { isFailedModalOpen && (
              <FailedModal
                FailedMessage={FailedMessage}
                onClose={handleCloseFailedModal}
              />
            )}
      </div>
   
  );
}

export default CreateCampaign;
