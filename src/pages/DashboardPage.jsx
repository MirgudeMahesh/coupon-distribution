import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

/* -------------------------------------------------------
   Static data – will be replaced by API responses later
   ------------------------------------------------------- */
const USER = {
  name: 'Rahul',
  company: 'TechCorp Pvt. Ltd.',
  vitaminLevel: 'Low',
  nutrition: 'Moderate',
  hydration: 'Good',
  fitness: 'Moderate',
};

const COUPONS = [
  {
    id: 'c1',
    title: '50% Off Vitamin D Test',
    description: 'Get your Vitamin D levels checked at a special price on 1mg.',
    expiry: 'May 30, 2026',
    status: 'ready',
    code: 'VITD50',
  },
  {
    id: 'c2',
    title: '20% Off Health Checkup',
    description: 'Complete blood panel with essential biomarkers.',
    expiry: 'Jun 15, 2026',
    status: 'pinned',
    code: 'HEALTH20',
  },
];

const FAMILY_MEMBERS = [
  { id: 'f1', name: 'Priya Sharma', relation: 'Spouse', couponStatus: 'assigned' },
  { id: 'f2', name: 'Arjun Sharma', relation: 'Child 1', couponStatus: 'unused' },
  { id: 'f3', name: 'Sunil Sharma', relation: 'Father', couponStatus: 'assigned' },
  { id: 'f4', name: 'Kiran Sharma', relation: 'Mother', couponStatus: 'used' },
];

/* Coupon status badge helper */
const couponStatusBadge = (status) => {
  const map = {
    ready:    { label: 'Ready to Use', cls: 'badge-success' },
    assigned: { label: 'Coupon Assigned', cls: 'badge-info' },
    unused:   { label: 'No Coupon',  cls: 'badge-warning' },
    used:     { label: 'Used', cls: 'badge-danger' },
    pinned:   { label: 'Pinned', cls: 'badge-warning' },
  };
  const { label, cls } = map[status] || map.unused;
  return <span className={`badge ${cls}`}>{label}</span>;
};

/* Health Summary Data - Mocked for visualization */
const HEALTH_SUMMARY = {
  bmi: '24.2',
  comorbidityText: 'No pre-existing conditions reported.',
  total: '3',
  risk: 'Low',
};

/**
 * DashboardPage — Main employee dashboard.
 * Shows health summary, coupons, family members, and quick actions.
 */
const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="db-root">
      {/* ── HEADER ── */}
      <header className="db-header">
        <div className="container">
          <p className="db-greeting">Good morning 🌿</p>
          <h1 className="db-name">Hi, {USER.name} 👋</h1>
          <p className="db-company">{USER.company}</p>
        </div>
      </header>

      <div className="db-body container">

        {/* ── PRIMARY CTA ── */}
        <button
          id="claim-coupon-btn"
          className="btn-accent db-cta"
          onClick={() => navigate('/coupon')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          Claim Your Vitamin D Test Discount
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        {/* ── HEALTH SNAPSHOT ── */}
        <section className="db-section">
          <h2 className="db-section-title">Health Snapshot</h2>
          <div className="db-summary-card">
            
            <div className="db-summary-row" style={{ borderTop: 'none', paddingTop: 0 }}>
              <div className="db-summary-group">
                <span className="db-summary-label">Total Score</span>
                <p className="db-summary-value">{HEALTH_SUMMARY.total}</p>
              </div>
              <div className="db-summary-group">
                <span className="db-summary-label">Risk Level</span>
                <div className="db-risk-wrap">
                  <div className="db-risk-dot" />
                  <p className="db-summary-value">{HEALTH_SUMMARY.risk} Risk</p>
                </div>
              </div>
            </div>

            <div className="db-adequacy-box">
              <p className="db-adequacy-title">ADEQUACY GUIDE</p>
              <div className="db-adequacy-grid">
                <span className="db-adequacy-val">&lt; 5</span> <span className="db-adequacy-arrow">→</span> <span className="db-adequacy-label">Adequate</span>
                <span className="db-adequacy-val">≥ 5</span> <span className="db-adequacy-arrow">→</span> <span className="db-adequacy-label">Inadequate</span>
              </div>
            </div>

            <div className="db-disclaimer">
              <p>
                This is a screening test and not a substitute for a diagnostic test. 
                Please consult your doctor for interpretation and appropriate treatment.
              </p>
            </div>
          </div>
        </section>

        {/* ── COUPONS ── */}
        <section className="db-section">
          <div className="db-section-header">
            <h2 className="db-section-title">Your Coupons</h2>
            <button className="db-view-all" onClick={() => navigate('/coupon')}>View All</button>
          </div>

          <div className="db-coupon-list">
            {COUPONS.map((c) => (
              <div key={c.id} className="db-coupon-card">
                <div className="db-coupon-left">
                  <div className="db-coupon-dot" />
                  <div>
                    <p className="db-coupon-title">{c.title}</p>
                    <p className="db-coupon-desc">{c.description}</p>
                    <p className="db-coupon-expiry">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      Expires {c.expiry}
                    </p>
                  </div>
                </div>
                <button
                  className="db-redeem-btn"
                  onClick={() => navigate('/coupon')}
                  id={`redeem-${c.id}`}
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAMILY MEMBERS ── */}
        <section className="db-section">
          <div className="db-section-header">
            <h2 className="db-section-title">Family Members</h2>
            <button
              className="db-add-btn"
              onClick={() => navigate('/add-family')}
              id="add-family-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add
            </button>
          </div>

          <div className="db-family-list">
            {FAMILY_MEMBERS.map((m) => (
              <div key={m.id} className="db-family-item">
                <div className="db-family-avatar">
                  {m.name.charAt(0)}
                </div>
                <div className="db-family-info">
                  <p className="db-family-name">{m.name}</p>
                  <p className="db-family-relation">{m.relation}</p>
                </div>
                {couponStatusBadge(m.couponStatus)}
              </div>
            ))}
          </div>
        </section>

        {/* ── QUICK ACTIONS ── */}
        <section className="db-section">
          <div className="db-quick-actions">
            <button
              className="db-quick-card"
              onClick={() => navigate('/report')}
              id="view-report-btn"
            >
              <div className="db-quick-icon db-quick-icon--teal">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span>View Report</span>
            </button>

            <button
              className="db-quick-card"
              onClick={() => navigate('/family-list')}
              id="family-list-btn"
            >
              <div className="db-quick-icon db-quick-icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <span>Family List</span>
            </button>

            <button
              className="db-quick-card"
              onClick={() => navigate('/questionnaire')}
              id="questionnaire-btn"
            >
              <div className="db-quick-icon db-quick-icon--teal">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="15" y2="16" />
                  <line x1="9" y1="8" x2="10" y2="8" />
                </svg>
              </div>
              <span>Questionnaire</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DashboardPage;
