import React, { useEffect, useState } from "react";

const D3CampaignData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://backend-d3-repo.onrender.com/d3-campaign-data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>

        <style>{styles}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        {error}

        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="title">D3 Campaign Data</h2>

      {data.length === 0 ? (
        <p className="no-data">No records found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="campaign-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>
                      {value !== null ? value.toString() : "NULL"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{styles}</style>
    </div>
  );
};

const styles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f6f9;
  }

  .page-container {
    padding: 30px;
    min-height: 100vh;
    background-color: #f4f6f9;
  }

  .title {
    text-align: center;
    margin-bottom: 25px;
    color: #222;
    font-size: 28px;
  }

  .table-wrapper {
    overflow-x: auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 15px;
  }

  .campaign-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
  }

  .campaign-table thead {
    background-color: #007bff;
    color: white;
  }

  .campaign-table th,
  .campaign-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }

  .campaign-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .campaign-table tbody tr:hover {
    background-color: #eef5ff;
    transition: 0.2s;
  }

  .loading-container,
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 22px;
    font-weight: bold;
  }

  .loading-text {
    color: #007bff;
  }

  .error-container {
    color: red;
  }

  .no-data {
    text-align: center;
    font-size: 18px;
    color: #666;
  }
`;

export default D3CampaignData;