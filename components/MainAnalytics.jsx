"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Chart, ArcElement } from 'chart.js/auto';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const MainAnalytics = () => {
  const { data: uservar } = useSession();
  const mail = uservar?.user.email;

  const [analyticsData, setAnalyticsData] = useState({
    totalEmailsSent: 0,
    totalEmailsOpened: 0,
    totalReplies: 0,
  });

  const chartRef = useRef(null);
// API Endpoint for Fetching all Analytics Data of All Campaigns that has been Sent... 
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        if (!mail) {
          console.log('No Login Email here');
          return;
        }

        const response = await axios.get(`/api/mainanalytics?mail=${mail}`);

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setAnalyticsData(data);
        } else {
          console.error('Error fetching analytics data.');
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalytics();
  }, [mail]);

  // Setup Chart Data...
  const chartData = useMemo(() => {
    return {
      labels: ['Emails Sent', 'Emails Opened', 'Replies'],
      datasets: [
        {
          data: [
            analyticsData.totalEmailsSent,
            analyticsData.totalEmailsOpened,
            analyticsData.totalReplies,
          ],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        },
      ],
    };
  }, [analyticsData]);

  useEffect(() => {
    // Create and configure the chart when the component mounts or when analyticsData changes
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Register the ArcElement
      Chart.register(ArcElement);

      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData, // Use the memoized chartData here
      });

      return () => {
        // Cleanup chart instance when the component unmounts
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className="mt-4 flex justify-center items-center h-[58vh]">
      <div className="mt-2 w-full max-w-[60vh]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default MainAnalytics;
