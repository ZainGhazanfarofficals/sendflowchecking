import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import SuccessModal from "./SuccessModal";
import axios from 'axios';

const ExcelImport = ({ onTableDataChange, tableData: tableprop, file }) => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [fileData, setFileData] = useState([]);

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    if (tableprop) {
      setTableData(tableprop);
    }
  }, [tableprop]);

  useEffect(() => {
    if (file) {
      ReadExcel(file);
    }
  }, [file]);

  const ReadExcel = async (filename) => {
    try {
      const apiUrl = (`https://sendflowchecking.vercel.app/getExcelFile?filename=${encodeURIComponent(filename)}`);
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.status === 200) {
        const filedata = await response.json();
        console.log('File contents:', filedata.data);
        setFileData(filedata.data);
      } else {
        console.error('Error:', response.data);
        setError('An error occurred while retrieving the file.');
      }
    } catch (error) {
      console.error('Error retrieving file:', error);
      setError('An error occurred while retrieving the file.');
    }
  };

  const importExcel = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.getWorksheet(1);

      const fileData = [];
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        fileData.push(row.values);
      });

      const headerRowIndex = fileData.findIndex(row =>
        row.includes('name') && row.includes('email') && row.includes('company') && row.includes('other')
      );

      if (headerRowIndex !== -1) {
        const headers = fileData[headerRowIndex];
        const nameIndex = headers.indexOf('name');
        const emailIndex = headers.indexOf('email');
        const companyIndex = headers.indexOf('company');
        const otherIndex = headers.indexOf('other');

        const filteredData = fileData
          .slice(headerRowIndex + 1)
          .filter(row => row[nameIndex] && row[emailIndex] && row[companyIndex] && row[otherIndex])
          .map(row => ({
            name: row[nameIndex],
            email: row[emailIndex],
            company: row[companyIndex],
            other: row[otherIndex],
          }));

        const updatedData = filteredData.map(item => ({
          ...item,
          email: item.email.text,
        }));

        try {
          const formData = new FormData();
          formData.append('ExcelFile', file);

          const entries = formData.entries();
          for (const entry of entries) {
            console.log(entry[0], entry[1]);
          }
          const response = await axios.post('/api/uploadexcel', formData);

          if (response.status === 200) {
            onTableDataChange(updatedData, response.data.filename);
            setTableData(updatedData);
            e.target.value = '';
            setSuccessMessage('File Uploaded successfully.');
            setIsSuccessModalOpen(true);
          } else {
            console.error('Error:', response.data);
            setError('An error occurred while uploading the file.');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          setError('An error occurred while uploading the file.');
        }
      } else {
        setError('Columns not found in the Excel file.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const renderTableRowsTable = (data) => {
    if (data.length > 0) {
      return (
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.company}</td>
              <td>{row.other}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  const renderTableRowsFile = (data) => {
    if (data.length > 0) {
      return (
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <div>
      <input
        required
        style={{ display: 'none' }}
        type="file"
        onChange={importExcel}
      />
      <label>
        Upload Excel File:
        <input
          type="file"
          accept=".xlsx"
          onChange={importExcel}
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Other</th>
          </tr>
        </thead>
        {tableData.length > 0 && renderTableRowsTable(tableData)}
        {fileData.length > 0 && renderTableRowsFile(fileData.slice(1))}
      </table>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isSuccessModalOpen && (
        <SuccessModal
          SuccessMessage={successMessage}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
};

export default ExcelImport;
