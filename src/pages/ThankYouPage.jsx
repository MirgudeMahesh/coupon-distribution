import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

/**
 * ThankYouPage — Landing page shown after the external questionnaire is submitted.
 * Instructs the user to check WhatsApp and offers a preview dashboard button.
 */
const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="ty-root">
      {/* Subtle gradient orbs for depth */}
      <div className="ty-orb ty-orb--top" />
      <div className="ty-orb ty-orb--bottom" />

      <div className="ty-container fade-in-up">
        {/* Success icon */}
        <div className="ty-icon-wrap">
          <div className="ty-icon-ring" />
          <div className="ty-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="ty-title">Thank You!</h1>
        <p className="ty-subtitle">
          Your health questionnaire has been submitted successfully.
        </p>

        {/* WhatsApp notice card */}
        <div className="ty-card ty-whatsapp-card">
          <div className="ty-wa-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.524 5.855L0 24l6.29-1.511A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.67-.508-5.2-1.396l-.374-.22-3.732.897.937-3.637-.243-.385A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </div>
          <div className="ty-wa-text">
            <span className="ty-wa-label">Check WhatsApp</span>
            <span className="ty-wa-sub">Your results are on the way</span>
          </div>
        </div>

        <p className="ty-desc">
          We'll send you a personalized health summary, along with an exclusive
          discount coupon for your Vitamin D test.
        </p>

        {/* What happens next */}
        <div className="ty-steps">
          <h3 className="ty-steps-title">What happens next?</h3>
          <ol className="ty-step-list">
            <li className="ty-step-item">
              <span className="ty-step-num">1</span>
              <span>Receive your health summary on WhatsApp</span>
            </li>
            <li className="ty-step-item">
              <span className="ty-step-num">2</span>
              <span>Tap the magic link to access your dashboard</span>
            </li>
            <li className="ty-step-item">
              <span className="ty-step-num">3</span>
              <span>Claim your exclusive coupon</span>
            </li>
          </ol>
        </div>

        {/* CTA */}
        <button
          className="btn-primary ty-btn"
          onClick={() => navigate('/dashboard')}
          id="preview-dashboard-btn"
        >
          Preview Dashboard
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <p className="ty-footer-note">
          Powered by <strong>Nutrihealth</strong> &mdash; Your wellness partner
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
