import React, { useEffect, useState } from "react";

const VALID_USERNAME = "d3-screening-pulse";
const VALID_PASSWORD = "pulse@123";

const D3CampaignData = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    fetch("https://backend-d3-repo.onrender.com/d3-campaign-data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
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
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="logo-icon">📊</span>
          </div>
          <h1 className="auth-title">D3 Screening Pulse</h1>
          <p className="auth-subtitle">Sign in to access campaign data</p>

          <div className="auth-form">
            <div className="field-group">
              <label className="field-label">Username</label>
              <input
                className="field-input"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="password-wrapper">
                <input
                  className="field-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="toggle-password"
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                  type="button"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="login-error">
                <span>⚠️</span> {loginError}
              </div>
            )}

            <button className="login-btn" onClick={handleLogin}>
              Sign In →
            </button>
          </div>
        </div>
        <style>{loginStyles}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <div className="loading-text">Fetching campaign data…</div>
        <style>{tableStyles}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <span>❌</span> {error}
        <style>{tableStyles}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="title">D3 Campaign Data</h2>
        <button
          className="logout-btn"
          onClick={() => {
            setIsAuthenticated(false);
            setUsername("");
            setPassword("");
            setData([]);
            setError("");
          }}
        >
          Logout
        </button>
      </div>

      {data.length === 0 ? (
        <p className="no-data">No records found.</p>
      ) : (
        <div className="table-wrapper">
          <p className="record-count">{data.length} records found</p>
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
      <style>{tableStyles}</style>
    </div>
  );
};

const loginStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .auth-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 48px 44px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05) inset;
    position: relative;
    z-index: 1;
  }

  .auth-logo {
    text-align: center;
    margin-bottom: 20px;
  }

  .logo-icon {
    font-size: 40px;
    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.5));
  }

  .auth-title {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: #f0f9ff;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .auth-subtitle {
    text-align: center;
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 36px;
    font-weight: 400;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field-label {
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
  }

  .field-input {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 13px 16px;
    color: #f1f5f9;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    width: 100%;
  }

  .field-input::placeholder { color: #475569; }

  .field-input:focus {
    border-color: rgba(56, 189, 248, 0.5);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }

  .password-wrapper {
    position: relative;
  }

  .password-wrapper .field-input {
    padding-right: 48px;
  }

  .toggle-password {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .toggle-password:hover { opacity: 1; }

  .login-error {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 10px;
    padding: 12px 16px;
    color: #fca5a5;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .login-btn {
    background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
    border: none;
    border-radius: 12px;
    padding: 14px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    letter-spacing: 0.2px;
    box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3);
    margin-top: 4px;
  }

  .login-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(14, 165, 233, 0.4);
  }

  .login-btn:active {
    transform: translateY(0);
  }
`;

const tableStyles = `
  * { box-sizing: border-box; }

  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  body {
    margin: 0;
    font-family: 'DM Sans', Arial, sans-serif;
    background-color: #f0f4f8;
  }

  .page-container {
    padding: 30px;
    min-height: 100vh;
    background-color: #f0f4f8;
    font-family: 'DM Sans', Arial, sans-serif;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .title {
    color: #1e293b;
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
  }

  .logout-btn {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 9px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
  }

  .logout-btn:hover { background: #dc2626; }

  .record-count {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 10px;
    font-family: 'DM Mono', monospace;
  }

  .table-wrapper {
    overflow-x: auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    padding: 20px;
  }

  .campaign-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
    font-family: 'DM Sans', sans-serif;
  }

  .campaign-table thead {
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    color: white;
  }

  .campaign-table th,
  .campaign-table td {
    padding: 12px 15px;
    border: 1px solid #e2e8f0;
    text-align: left;
    font-size: 14px;
  }

  .campaign-table th {
    font-weight: 600;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  .campaign-table tbody tr:nth-child(even) {
    background-color: #f8fafc;
  }

  .campaign-table tbody tr:hover {
    background-color: #eff6ff;
    transition: 0.15s;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top-color: #0ea5e9;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    color: #0ea5e9;
    font-size: 18px;
    font-weight: 600;
  }

  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100vh;
    font-size: 20px;
    font-weight: bold;
    color: #ef4444;
    font-family: 'DM Sans', sans-serif;
  }

  .no-data {
    text-align: center;
    font-size: 18px;
    color: #64748b;
  }
`;

export default D3CampaignData;
