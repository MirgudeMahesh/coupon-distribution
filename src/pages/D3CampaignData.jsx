import React, { useEffect, useState } from "react";

const D3CampaignData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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

  // Extract unique dates (date only, no time) from data
  const uniqueDates = [
    ...new Set(
      data.map((row) => {
        const d = new Date(row.created_at);
        return d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
      })
    ),
  ].sort((a, b) => new Date(a) - new Date(b));

  const filteredData =
    selectedDate === ""
      ? data
      : data.filter((row) => {
          const d = new Date(row.created_at);
          return (
            d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }) ===
            selectedDate
          );
        });

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

      <div className="filter-bar">
        <label htmlFor="dateFilter">Filter by Date:</label>
        <select
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">All Dates</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        <span className="record-count">
          {filteredData.length} record{filteredData.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {filteredData.length === 0 ? (
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
              {filteredData.map((row, index) => (
                <tr key={index}>
                  {Object.entries(row).map(([key, value], i) => (
                    <td key={i}>
                      {value !== null
                        ? key === "created_at"
                          ? new Date(value).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })
                          : value.toString()
                        : "NULL"}
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

  .filter-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }

  .filter-bar label {
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }

  .filter-bar select {
    padding: 8px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    background: white;
    cursor: pointer;
    outline: none;
  }

  .filter-bar select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }

  .record-count {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background-color: #007bff;
    padding: 5px 12px;
    border-radius: 20px;
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
