"use client"
import React, { useState, useEffect, useMemo } from "react";
import CreateCampaign from "./CreateCampaigns";
import UpdateCampaign from "./EditCampaignForm";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";

//Parent Component of Create Campaign and Edit Campaign....
export default function Campaigns() {
  const [createCampaigns, setCreateCampaigns] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null); // Added state for selected campaign
  const [isEditClicked, setIsEditClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [tableData, setTableData] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [dateInfo, setdateInfo] = useState("");

  const { data: user } = useSession();
  const mail = user?.user?.email;


// API endpoint to fetch Campaign Data...
  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:3000/api/campaign?variableName=${encodeURIComponent(mail)}`;
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.status === 200) {
        const { campaigns } = await response.json();
        setCampaignData(campaigns);
      } else {
        console.error("Error fetching campaigns:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const campaignList = useMemo(() => {
    return (
      campaignData.length > 0 &&
      !selectedCampaign && (
        <ul>
          {campaignData.map((campaign) => (
            <li key={campaign._id} className="border p-4 my-2 flex justify-between items-center">
              <div>
                <div className="font-bold text-xl">{campaign.subject}</div>
                <div className="text-sm">{campaign.body.slice(0, 50)}...</div>
              </div>
              <div className="flex gap-2">
                <RemoveBtn id={campaign._id} refreshData={fetchData} />
                <button onClick={() => handleEditClick(campaign)}>
                  <HiPencilAlt size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )
    );
  }, [campaignData, selectedCampaign]); 

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign); // Set the selected campaign data
    setIsEditClicked(true); // Set isEditClicked to true
    setCreateCampaigns(false); // Disable create button
  };

  return (
    <div>
      {createCampaigns ? (
        <CreateCampaign
          email={email}
          setEmail={setEmail}
          appPassword={appPassword}
          setAppPassword={setAppPassword}
          tableData={tableData}
          setTableData={setTableData}
          subject={subject}
          setSubject={setSubject}
          body={body}
          setBody={setBody}
          dateInfo={dateInfo}
          setdateInfo={setdateInfo}
        />
      ) : (
        <>
          {!isEditClicked && (
            <button
            className="mb-6 ml-auto rounded-lg bg-black text-white hover:bg-gray-800 py-2 px-6"
            onClick={() => setCreateCampaigns(true)}
          >
            Create Campaign
          </button>
          )}
          {campaignList}

          {selectedCampaign && (
            <UpdateCampaign campaign={selectedCampaign} />
          )}
        </>
      )}
    </div>
  );
}
