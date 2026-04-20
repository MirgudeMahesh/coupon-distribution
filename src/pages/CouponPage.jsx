import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CouponPage.css';

/**
 * CouponPage — Displays a specific coupon with code and redeem CTA.
 */
const CouponPage = () => {
  const navigate = useNavigate();

  const couponData = {
    title: '50% OFF',
    subtitle: 'Vitamin D Test',
    code: 'VITD50',
    validUntil: 'May 30, 2026',
    description: 'Applicable on Vitamin D (25-Hydroxy) test via 1mg. One-time use only.'
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponData.code);
    alert('Coupon code copied to clipboard!');
  };

  return (
    <div className="cp-root">
      <div className="cp-container fade-in-up">
        {/* Back */}
        <button className="back-link" onClick={() => navigate('/dashboard')} id="coupon-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <div className="cp-header">
          <h1 className="cp-title">Your Coupon</h1>
          <p className="cp-subtitle">Exclusive offer from Nutrihealth</p>
        </div>

        <div className="cp-card">
          <div className="cp-card-top">
            <div className="cp-ticket-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <h2 className="cp-discount">{couponData.title}</h2>
            <p className="cp-test-name">{couponData.subtitle}</p>
          </div>

          <div className="cp-card-line">
            <div className="cp-circle cp-circle-left" />
            <div className="cp-dashed" />
            <div className="cp-circle cp-circle-right" />
          </div>

          <div className="cp-card-bottom">
            <p className="cp-code-label">Coupon Code</p>
            <div className="cp-code-wrap">
              <span className="cp-code-text">{couponData.code}</span>
              <button className="cp-copy-btn" onClick={handleCopyCode} title="Copy Code">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>

            <div className="cp-info">
              <div className="cp-info-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Valid until {couponData.validUntil}</span>
              </div>
              <p className="cp-desc">{couponData.description}</p>
            </div>

            <button 
              className="btn-primary cp-redeem-btn" 
              onClick={() => window.open('https://www.1mg.com', '_blank')}
            >
              Redeem on 1mg
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
