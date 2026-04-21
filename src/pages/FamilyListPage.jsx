import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FamilyListPage.css';

/**
 * FamilyListPage — Shows list of added members and their coupon usage status.
 */
const FamilyListPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('nutrihealth_added_family_details');
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'assigned': return <span className="badge badge-info">Assigned</span>;
      case 'used': return <span className="badge badge-danger">Used</span>;
      default: return <span className="badge badge-warning">Unused</span>;
    }
  };

  return (
    <div className="fl-root">
      <div className="container fl-container fade-in-up">
        {/* Back */}
        <button className="back-link" onClick={() => navigate('/dashboard')} id="family-list-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <header className="fl-header">
          <h1 className="fl-title">Family Circle</h1>
          <p className="fl-subtitle">Track coupon status for your loved ones</p>
        </header>

        <div className="fl-list">
          {members.map((m) => (
            <div key={m.id} className="fl-card">
              <div className="fl-card-left">
                <div className="fl-avatar">{m.name.charAt(0)}</div>
                <div>
                  <p className="fl-name">{m.name}</p>
                  <p className="fl-rel">{m.relation} • {m.date}</p>
                </div>
              </div>
              {getStatusBadge(m.couponStatus)}
            </div>
          ))}
        </div>

        <button className="btn-primary fl-add-btn" onClick={() => navigate('/add-family')} id="family-list-add-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Member
        </button>
      </div>
    </div>
  );
};

export default FamilyListPage;
