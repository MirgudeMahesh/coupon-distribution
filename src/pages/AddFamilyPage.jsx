import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFamilyPage.css';

/**
 * AddFamilyPage — Form to add a family member.
 * Restricts to Spouse, Child 1, and Child 2 (one each).
 */
const AddFamilyPage = () => {
  const navigate = useNavigate();

  // Load added relationships from localStorage to simulate persistence
  const [addedRelationships, setAddedRelationships] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('nutrihealth_added_family');
    if (saved) {
      setAddedRelationships(JSON.parse(saved));
    } else {
      // Default members from mock dashboard
      const defaults = ['spouse', 'child1'];
      setAddedRelationships(defaults);
      localStorage.setItem('nutrihealth_added_family', JSON.stringify(defaults));
    }
  }, []);

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    relationship: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name = 'Name is required';
    
    // Spouse: Phone is mandatory. Child 1 & 2: Optional.
    if (form.relationship === 'spouse') {
      if (!form.phone.trim()) {
        e.phone = 'Phone number is required for Spouse';
      }
    }
    
    if (!form.relationship)        e.relationship = 'Please select a relationship';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    
    // If relationship changes, clear phone error if it was optional for the new relationship
    if (name === 'relationship') {
      if (value !== 'spouse') {
        setErrors((prev) => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Save to "persistence"
    const updated = [...addedRelationships, form.relationship];
    setAddedRelationships(updated);
    localStorage.setItem('nutrihealth_added_family', JSON.stringify(updated));
    
    setSubmitted(true);
  };

  const availableOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'child1', label: 'Child 1' },
    { value: 'child2', label: 'Child 2' },
  ].filter(opt => !addedRelationships.includes(opt.value));

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="af-root">
        <div className="af-success fade-in-up">
          <div className="af-success-icon">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="af-success-title">Member Added!</h2>
          <p className="af-success-sub">
            <strong>{form.name}</strong> has been added to your family plan.
          </p>

          <div className="af-coupon-notice">
            <div className="af-coupon-notice-icon">🎟️</div>
            <div>
              <p className="af-coupon-notice-title">Coupon Auto-Assigned</p>
              <p className="af-coupon-notice-desc">
                {form.phone.trim() 
                  ? `A 50% Off Vitamin D Test coupon has been sent to ${form.phone} via WhatsApp.`
                  : "A coupon has been generated for them. You can share the link later."
                }
              </p>
            </div>
          </div>

          <div className="af-success-actions">
            <button className="btn-primary" onClick={() => navigate('/dashboard')} id="back-dashboard-btn">
              Back to Dashboard
            </button>
            {availableOptions.length > 0 && (
              <button className="btn-outline af-add-another" onClick={() => { setSubmitted(false); setForm({ name:'',age:'',gender:'',phone:'',relationship:'' }); }} id="add-another-btn">
                Add Another
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="af-root">
      <div className="af-container fade-in-up">

        {/* Back */}
        <button className="back-link" onClick={() => navigate('/dashboard')} id="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        {/* Page title */}
        <div className="af-page-title">
          <div className="af-title-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="23" y1="11" x2="17" y2="11" />
              <line x1="20" y1="8" x2="20" y2="14" />
            </svg>
          </div>
          <div>
            <h1 className="af-title">Add Family Member</h1>
            <p className="af-subtitle">One Spouse and up to 2 children can be added</p>
          </div>
        </div>

        {/* Form card */}
        <div className="af-card">
          {availableOptions.length > 0 ? (
            <>
              <h3 className="af-card-title">Member Details</h3>
              <form onSubmit={handleSubmit} noValidate className="af-form">

                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="af-name">Name *</label>
                  <input
                    id="af-name"
                    name="name"
                    type="text"
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="af-error">{errors.name}</p>}
                </div>

                {/* Age + Gender */}
                <div className="af-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" htmlFor="af-age">Age</label>
                    <input
                      id="af-age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      className="form-input"
                      placeholder="Age"
                      value={form.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label" htmlFor="af-gender">Gender</label>
                    <select
                      id="af-gender"
                      name="gender"
                      className="form-select"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Relationship */}
                <div className="form-group">
                  <label className="form-label" htmlFor="af-relationship">Relationship *</label>
                  <select
                    id="af-relationship"
                    name="relationship"
                    className={`form-select ${errors.relationship ? 'form-input--error' : ''}`}
                    value={form.relationship}
                    onChange={handleChange}
                  >
                    <option value="">Select relationship</option>
                    {availableOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.relationship && <p className="af-error">{errors.relationship}</p>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="af-phone">
                    Phone {form.relationship === 'spouse' ? '*' : '(Optional)'}
                  </label>
                  <input
                    id="af-phone"
                    name="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    placeholder={form.relationship === 'spouse' ? "Spouse's phone number" : "Phone number (optional)"}
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="af-error">{errors.phone}</p>}
                </div>

                <button type="submit" className="btn-primary af-submit-btn" id="submit-family-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                  </svg>
                  Add Member &amp; Assign Coupon
                </button>

              </form>
            </>
          ) : (
            <div className="af-limit-reached">
              <div className="af-limit-icon">ℹ️</div>
              <p className="af-limit-text">
                You have already added all available family slots (Spouse, Child 1, and Child 2).
              </p>
              <button className="btn-primary" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddFamilyPage;
