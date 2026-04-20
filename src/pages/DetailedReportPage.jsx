import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailedReportPage.css';

/**
 * DetailedReportPage — Shows health insights and nutrition tips.
 */
/* Mock data for the detailed report */
const REPORT_DATA = {
  patient: { initials: 'R.K.', age: 32, gender: 'Male' },
  height: { feet: 5, inches: 11 },
  weight: 78,
  bmi: '24.2',
  comorbidityText: 'None reported',
  total: '3',
  risk: 'Low'
};

/**
 * DetailedReportPage — Shows health assessment report.
 */
const DetailedReportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dr-root">
      <div className="container dr-container fade-in-up">
        {/* Back */}
        <button className="back-link" onClick={() => navigate('/dashboard')} id="report-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <div className="dr-report-card">
          <header className="dr-report-header">
            <h1 className="dr-report-title">Vitamin D Assessment Report</h1>
            <div className="dr-divider" />
          </header>

          <div className="dr-report-content">
            {/* Demographics */}
            <div className="dr-info-grid">
              <div className="dr-info-item">
                <span className="dr-label">Patient</span>
                <span className="dr-value">{REPORT_DATA.patient.initials}</span>
              </div>
              <div className="dr-info-item">
                <span className="dr-label">Age</span>
                <span className="dr-value">{REPORT_DATA.patient.age}</span>
              </div>
              <div className="dr-info-item">
                <span className="dr-label">Gender</span>
                <span className="dr-value">{REPORT_DATA.patient.gender}</span>
              </div>
            </div>

            {/* Vitals */}
            <div className="dr-stats-row">
              <div className="dr-stat">
                <span className="dr-label">Height</span>
                <span className="dr-value">{REPORT_DATA.height.feet}'{REPORT_DATA.height.inches}"</span>
              </div>
              <div className="dr-stat">
                <span className="dr-label">Weight</span>
                <span className="dr-value">{REPORT_DATA.weight}kg</span>
              </div>
              <div className="dr-stat">
                <span className="dr-label">BMI</span>
                <span className="dr-value">{REPORT_DATA.bmi}</span>
              </div>
            </div>

            <div className="dr-divider" />

            {/* Clinical */}
            <div className="dr-clinical-section">
              <div className="dr-info-group">
                <span className="dr-label">Comorbidities</span>
                <p className="dr-value-block">{REPORT_DATA.comorbidityText}</p>
              </div>

              <div className="dr-score-row">
                <div className="dr-info-item">
                  <span className="dr-label">Total Score</span>
                  <span className="dr-value dr-highlight">{REPORT_DATA.total}</span>
                </div>
                <div className="dr-info-item">
                  <span className="dr-label">Risk Level</span>
                  <span className="dr-value dr-highlight">{REPORT_DATA.risk} Risk</span>
                </div>
              </div>
            </div>

            {/* Adequacy Guide */}
            <div className="dr-guide-box">
              <p className="dr-guide-title">ADEQUACY GUIDE</p>
              <div className="dr-guide-grid">
                <span>&lt; 5</span> <span>→</span> <span>Adequate</span>
                <span>&ge; 5</span> <span>→</span> <span>Inadequate</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="dr-disclaimer">
              <p>
                This is a screening test and not a substitute for a diagnostic test. 
                Please consult your doctor for interpretation and appropriate treatment.
              </p>
            </div>
          </div>
        </div>

        <footer className="dr-footer">
          <button className="btn-primary" onClick={() => navigate('/coupon')} id="report-use-coupon-btn">
            Use Discount Coupon
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DetailedReportPage;
