import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailedReportPage.css';

/**
 * DetailedReportPage — Shows health insights and nutrition tips.
 */
const DetailedReportPage = () => {
  const navigate = useNavigate();

  const insights = [
    { title: 'Vitamin D', level: 'Deficient', detail: 'Your levels are below 20 ng/mL. Consider 20 mins of morning sun exposure.' },
    { title: 'Hydration', level: 'Optimal', detail: 'You are drinking ~2.5L daily. Keep it up!' },
    { title: 'Fiber Intake', level: 'Low', detail: 'Include more leafy greens and whole grains in your lunch.' }
  ];

  const tips = [
    'Add 1 tsp of Flaxseeds to your breakfast for Omega-3.',
    'Replace evening chai with Green Tea.',
    'Include Curd/Yogurt in lunch for gut health.'
  ];

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

        <header className="dr-header">
          <h1 className="dr-title">Your Health Report</h1>
          <p className="dr-subtitle">Based on your recent lifestyle questionnaire</p>
        </header>

        <section className="dr-section">
          <h2 className="dr-section-title">Key Insights</h2>
          <div className="dr-insight-list">
            {insights.map((item, index) => (
              <div key={index} className="dr-insight-card">
                <div className="dr-insight-top">
                  <span className="dr-insight-label">{item.title}</span>
                  <span className={`badge ${item.level === 'Deficient' || item.level === 'Low' ? 'badge-danger' : 'badge-success'}`}>
                    {item.level}
                  </span>
                </div>
                <p className="dr-insight-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="dr-section">
          <h2 className="dr-section-title">Personalized Nutrition Tips</h2>
          <div className="dr-tips-card">
            {tips.map((tip, index) => (
              <div key={index} className="dr-tip-item">
                <div className="dr-tip-dot" />
                <p className="dr-tip-text">{tip}</p>
              </div>
            ))}
          </div>
        </section>

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
