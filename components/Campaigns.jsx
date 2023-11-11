"use client"

import React, { useState, useEffect, useMemo } from "react";
import CreateCampaign from "./CreateCampaigns";
import UpdateCampaign from "./EditCampaignForm";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";

export default function Campaigns() {
  const [createCampaigns, setCreateCampaigns] = useState(false);
  const [campaignData, setCampaignData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [tableData, setTableData] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [dateInfo, setdateInfo] = useState("");

  const { data: user } = useSession();
  const mail = user?.user?.email;

  const fetchData = async () => {
    try {
      const apiUrl = mail ? `https://sendflowchecking.vercel.app/campaign?variableName=${encodeURIComponent(mail)}` : 'https://sendflowchecking.vercel.app/campaign';
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
            <li key={campaign._id}>
              <div>
                <div>{campaign.subject}</div>
                <div>{campaign.body.slice(0, 50)}...</div>
              </div>
              <div>
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
    setSelectedCampaign(campaign);
    setIsEditClicked(true);
    setCreateCampaigns(false);
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
            <button onClick={() => setCreateCampaigns(true)}>
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
