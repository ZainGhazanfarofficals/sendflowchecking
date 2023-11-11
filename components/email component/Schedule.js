import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarGfg({ takedateInfo, dateInfo, schedule:propdate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedHours, setSelectedHours] = useState(dateInfo?.hours || 0);
  const [selectedMinutes, setSelectedMinutes] = useState(dateInfo?.minutes || 0);
  const [selectedSeconds, setSelectedSeconds] = useState(dateInfo?.seconds || 0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (propdate) {
      const data = JSON.parse(propdate);
      setSelectedHours(data.hours);
      setSelectedMinutes(data.minutes);
      setSelectedSeconds(data.seconds);
    }
  }, [propdate]);

  const updateTime = () => {
    setCurrentTime(new Date());
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const sendEmailAtCurrentTime = () => {
    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() + 1);
    const currentDateTimeInfo = {
      day: currentDateTime.toLocaleDateString('en-US', { weekday: 'short' }),
      month: currentDateTime.toLocaleDateString('en-US', { month: 'short' }),
      date: currentDateTime.getDate(),
      hours: currentDateTime.getHours(),
      minutes: currentDateTime.getMinutes(),
      seconds: currentDateTime.getSeconds(),
    };
    setSelectedHours(currentDateTime.getHours());
    setSelectedMinutes(currentDateTime.getMinutes());
    setSelectedSeconds(currentDateTime.getSeconds());
    takedateInfo(currentDateTimeInfo);
  };

  const submitDate = () => {
    if (selectedHours === 0 && selectedMinutes === 0 && selectedSeconds === 0) {
      sendEmailAtCurrentTime();
    } else {
      const selectedDateInfo = {
        day: selectedDate.toLocaleDateString('en-US', { weekday: 'short' }),
        month: selectedDate.toLocaleDateString('en-US', { month: 'short' }),
        date: selectedDate.getDate(),
        hours: selectedHours,
        minutes: selectedMinutes,
        seconds: selectedSeconds,
      };

      const selectedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedHours,
        selectedMinutes,
        selectedSeconds
      );

      if (selectedDateTime <= currentTime) {
        setError('Cannot schedule Time in the past.');
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
      }

      setError('');
      takedateInfo(selectedDateInfo);
    }
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);
  const secondOptions = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="mt-5 space-y-4">
      <div className="flex space-x-4">
        <div>
          <label>Select Hour:</label>
          <select
            value={selectedHours}
            onChange={(e) => setSelectedHours(Number(e.target.value))}
          >
            {hourOptions.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Minute:</label>
          <select
            value={selectedMinutes}
            onChange={(e) => setSelectedMinutes(Number(e.target.value))}
          >
            {minuteOptions.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Second:</label>
          <select
            value={selectedSeconds}
            onChange={(e) => setSelectedSeconds(Number(e.target.value))}
          >
            {secondOptions.map((second) => (
              <option key={second} value={second}>
                {second}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()}
        />
      </div>

      <strong>Current Time:</strong>
      <div>{currentTime.toLocaleTimeString()}</div>

      <div>
        <button onClick={submitDate}>Set Schedule</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
