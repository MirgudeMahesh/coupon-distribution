import React, { useState } from "react";
import { 
  calculateBMI, 
  getRiskLevel, 
  calculateSectionBScore, 
  generateAssessmentReport 
} from "./vitaminDCalculations";
import { formTranslations } from "./FormTranslations";

const StandaloneQuestionnaire = () => {
  const translations = formTranslations.english;
  const [errorField, setErrorField] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country_code: "+91",
    phone_number: "",
    age: "",
    gender: "",
    height_feet: "",
    height_inches: "",
    weight_kg: "",
    diabetes: false,
    hypertension: false,
    hypothyroidism: false,
    hyperthyroidism: false,
    pcos: false,
    other_comorbidity: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
    q13: "",
    q14: "",
    q15: "",
    q16: "",
    q17: "",
    q18: "",
  });

  const handleCalculateScore = async () => {
    // 1. Validate mandatory fields in Section A
    const mandatoryA = [
      { key: "name", label: "Patient Name" },
      { key: "phone_number", label: "Phone Number" },
      { key: "age", label: "Age" },
      { key: "gender", label: "Gender" },
      { key: "height_feet", label: "Height" },
      { key: "weight_kg", label: "Weight" }
    ];

    for (const field of mandatoryA) {
      if (!formData[field.key]?.toString().trim()) {
        setErrorField(field.key);
        const el = document.getElementById(`group-${field.key}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    
    // 3. Specific Validation Constraints
    if (formData.phone_number.length !== 10) {
      alert("Enter valid phone number");
      setErrorField("phone_number");
      const el = document.getElementById("group-phone_number");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (Number(formData.age) >= 120) {
      alert("Enter valid age");
      setErrorField("age");
      const el = document.getElementById("group-age");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (Number(formData.height_feet) >= 7) {
      alert("Enter valid height");
      setErrorField("height_feet");
      const el = document.getElementById("group-height_feet");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (Number(formData.height_inches) >= 13) {
      alert("Inches should be upto 12");
      setErrorField("height_inches");
      const el = document.getElementById("group-height_inches");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (Number(formData.weight_kg) >= 200) {
      alert("Enter valid weight");
      setErrorField("weight_kg");
      const el = document.getElementById("group-weight_kg");
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    // 4. Validate questionnaire questions (q3 - q18)
    const questionsToValidate = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    for (const num of questionsToValidate) {
      const qKey = `q${num}`;
      if (!formData[qKey]) {
        setErrorField(qKey);
        const el = document.getElementById(`group-${qKey}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    
    setErrorField(null);

    const heightFeet = Number(formData.height_feet) || 0;
    const heightInches = Number(formData.height_inches) || 0;
    const totalInches = heightFeet * 12 + heightInches;
    const heightMeters = totalInches > 0 ? totalInches * 0.0254 : 0;
    const weightKg = Number(formData.weight_kg) || 0;
    const age = Number(formData.age) || 0;

    const bmi = calculateBMI(weightKg, heightMeters);
    
    // Preparing q1 and q2 for Section B calculation as they are derived fields
    const extendedData = {
      ...formData,
      q1: age > 50 ? "yes" : "no",
      q2: bmi >= 30 ? "yes" : "no"
    };

    const totalScore = calculateSectionBScore(extendedData, age, bmi);
    const riskLevel = getRiskLevel(totalScore);

    const comorbidities = [];
    if (formData.diabetes) comorbidities.push("• Diabetes");
    if (formData.hypertension) comorbidities.push("• Hypertension");
    if (formData.hypothyroidism) comorbidities.push("• Hypothyroidism");
    if (formData.hyperthyroidism) comorbidities.push("• Hyperthyroidism");
    if (formData.pcos) comorbidities.push("• PCOS");
    if (formData.other_comorbidity) comorbidities.push(`• ${formData.other_comorbidity}`);

    const assessmentReport = generateAssessmentReport({
      name: formData.name,
      phone: `${formData.country_code} ${formData.phone_number}`,
      age,
      gender: formData.gender,
      height_feet: heightFeet,
      height_inches: heightInches,
      weight_kg: weightKg,
      bmi,
      totalScore,
      riskLevel,
      comorbidities
    });

    console.log("%c ASSESSMENT REPORT GENERATED ", "background: #10b981; color: #fff; font-weight: bold; padding: 4px;");
    console.log(assessmentReport);

    // Call API to send final message
    try {
      const fullPhone = `${formData.country_code}${formData.phone_number}`.replace('+', '');
      console.log(fullPhone);
      fetch("http://localhost:3000/send-final-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: fullPhone, name: formData.name, score: totalScore,riskLevel: riskLevel}),
      })
      .then(res => res.json())
      .then(data => console.log("Final message API response:", data))
      .catch(err => console.error("Error calling final message API:", err));
    } catch (err) {
      console.error("API call setup error:", err);
    }
    
    setShowModal(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      country_code: "+91",
      phone_number: "",
      age: "",
      gender: "",
      height_feet: "",
      height_inches: "",
      weight_kg: "",
      diabetes: false,
      hypertension: false,
      hypothyroidism: false,
      hyperthyroidism: false,
      pcos: false,
      other_comorbidity: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
      q10: "",
      q11: "",
      q12: "",
      q13: "",
      q14: "",
      q15: "",
      q16: "",
      q17: "",
      q18: "",
    });
  };

  const styles = `
    .sq-root { font-family: 'Inter', Arial, sans-serif; background: #f8fafc; min-height: 100vh; padding: 20px; color: #0f172a; }
    .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); padding: 30px; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { font-size: 24px; color: #10b981; margin-bottom: 8px; }
    .header p { color: #64748b; font-size: 14px; }
    .lang-selector { display: flex; justify-content: flex-end; margin-bottom: 20px; }
    .lang-selector select { padding: 8px 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; cursor: pointer; }
    .section { margin-bottom: 30px; }
    .section-title { font-weight: 700; font-size: 16px; color: #10b981; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 2px solid #ecfdf5; display: flex; align-items: center; gap: 8px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.025em; }
    input[type="text"], input[type="number"], select { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; transition: all 0.2s; background: #f8fafc; }
    input:focus, select:focus { border-color: #10b981; outline: none; background: white; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
    .checkbox-group { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin: 15px 0; }
    .checkbox-wrapper { display: flex; align-items: center; gap: 8px; padding: 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; cursor: pointer; }
    .checkbox-wrapper:hover { border-color: #10b981; }
    .button-group { display: flex; gap: 12px; margin-top: 40px; justify-content: flex-end; }
    button { padding: 12px 24px; font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: none; }
    .btn-calculate { background: #10b981; color: white; flex: 1; }
    .btn-calculate:hover { background: #059669; transform: translateY(-1px); }
    .btn-reset { background: #f1f5f9; color: #475569; }
    .btn-reset:hover { background: #e2e8f0; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    @media (max-width: 600px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }
    
    .has-error input, .has-error select { border-color: #ef4444 !important; background-color: #fef2f2 !important; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important; }
    .error-msg { color: #ef4444; font-size: 11px; font-weight: 600; margin-top: 4px; display: block; }
    .has-error label { color: #ef4444 !important; }

    /* Phone Input Style */
    .phone-input-group {
      display: flex;
      gap: 0;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      background: #f8fafc;
      transition: all 0.2s;
    }
    .phone-input-group:focus-within {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      background: white;
    }
    .country-select {
      width: 90px !important;
      border: none !important;
      border-right: 1px solid #e2e8f0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      padding-right: 25px !important;
    }
    .phone-input {
      border: none !important;
      border-radius: 0 !important;
      background: transparent !important;
      flex: 1;
    }
    .has-error .phone-input-group {
      border-color: #ef4444 !important;
      background-color: #fef2f2 !important;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
      background: white;
      max-width: 450px;
      width: 100%;
      border-radius: 24px;
      padding: 40px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-icon {
      width: 80px;
      height: 80px;
      background: #ecfdf5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }

    .modal-icon svg { color: #10b981; }

    .modal-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 12px;
      line-height: 1.2;
    }

    .modal-text {
      color: #64748b;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .modal-btn {
      background: #10b981;
      color: white;
      padding: 16px 32px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 12px;
      width: 100%;
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.25);
    }

    .modal-btn:hover { background: #059669; transform: scale(1.02); }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .info-text {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 6px;
      line-height: 1.4;
      display: block;
    }
    .submit-footer-info {
      text-align: center;
      margin-top: 16px;
    }
  `;

  return (
    <div className="sq-root">
      <style>{styles}</style>
      <div className="container">

        <div className="header">
          <h1>🏥 {translations.title}</h1>
          <p>Please provide accurate details for a reliable assessment score.</p>
        </div>

        {/* Section A */}
        <div className="section">
          <h2 className="section-title">👤 {translations.sectionA}</h2>
          
          <div className="grid-2">
            <div className={`form-group ${errorField === 'name' ? 'has-error' : ''}`} id="group-name">
              <label>Patient Name *</label>
              <input 
                type="text" 
                placeholder="" 
                value={formData.name} 
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errorField === 'name') setErrorField(null);
                }} 
              />
              {errorField === 'name' && <span className="error-msg">This field is required</span>}
            </div>

            <div className={`form-group ${errorField === 'phone_number' ? 'has-error' : ''}`} id="group-phone_number">
              <label>Phone Number *</label>
              <div className="phone-input-group">
                <select 
                  className="country-select"
                  value={formData.country_code}
                  onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+971">+971 (UAE)</option>
                  <option value="+65">+65 (SG)</option>
                </select>
                <input 
                  type="text"
                  className="phone-input"
                  placeholder="Enter number"
                  value={formData.phone_number}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone_number: val });
                    if (errorField === 'phone_number') setErrorField(null);
                  }}
                />
              </div>
              <p className="info-text">
                Please provide the whatsapp number, as your test results will be sent only to that number.
              </p>
              {errorField === 'phone_number' && <span className="error-msg">This field is required</span>}
            </div>
          </div>
          
          <div className="grid-2">
            <div className={`form-group ${errorField === 'age' ? 'has-error' : ''}`} id="group-age">
              <label>{translations.age} *</label>
              <input 
                type="number" 
                value={formData.age} 
                onChange={(e) => {
                  setFormData({ ...formData, age: e.target.value });
                  if (errorField === 'age') setErrorField(null);
                }} 
              />
              {errorField === 'age' && <span className="error-msg">Required</span>}
            </div>
            <div className={`form-group ${errorField === 'gender' ? 'has-error' : ''}`} id="group-gender">
              <label>{translations.gender} *</label>
              <select 
                value={formData.gender} 
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                  if (errorField === 'gender') setErrorField(null);
                }}
              >
                <option value="">{translations.selectGender}</option>
                <option value="Male">{translations.male}</option>
                <option value="Female">{translations.female}</option>
              </select>
              {errorField === 'gender' && <span className="error-msg">Required</span>}
            </div>
          </div>

          <div className="grid-3">
            <div className={`form-group ${errorField === 'height_feet' ? 'has-error' : ''}`} id="group-height_feet">
              <label>{translations.heightFeet} ({translations.feet}) *</label>
              <input 
                type="number" 
                value={formData.height_feet} 
                onChange={(e) => {
                  setFormData({ ...formData, height_feet: e.target.value });
                  if (errorField === 'height_feet') setErrorField(null);
                }} 
              />
              {errorField === 'height_feet' && <span className="error-msg">Required</span>}
            </div>
            <div className={`form-group ${errorField === 'height_inches' ? 'has-error' : ''}`} id="group-height_inches">
              <label>{translations.heightInches} ({translations.inches}) *</label>
              <input 
                type="number" 
                value={formData.height_inches} 
                onChange={(e) => {
                  setFormData({ ...formData, height_inches: e.target.value });
                  if (errorField === 'height_inches') setErrorField(null);
                }} 
              />
              {errorField === 'height_inches' && <span className="error-msg">Required</span>}
            </div>
            <div className={`form-group ${errorField === 'weight_kg' ? 'has-error' : ''}`} id="group-weight_kg">
              <label>{translations.weightKg} (kg) *</label>
              <input 
                type="number" 
                value={formData.weight_kg} 
                onChange={(e) => {
                  setFormData({ ...formData, weight_kg: e.target.value });
                  if (errorField === 'weight_kg') setErrorField(null);
                }} 
              />
              {errorField === 'weight_kg' && <span className="error-msg">Required</span>}
            </div>
          </div>

          <label>{translations.comorbidities}</label>
          <div className="checkbox-group">
            {[
              { key: "diabetes", label: translations.diabetes },
              { key: "hypertension", label: translations.hypertension },
              { key: "hypothyroidism", label: translations.hypothyroidism },
              { key: "hyperthyroidism", label: translations.hyperthyroidism },
              { key: "pcos", label: translations.pcos },
            ].map(({ key, label }) => (
              <div key={key} className="checkbox-wrapper" onClick={() => setFormData({ ...formData, [key]: !formData[key] })}>
                <input type="checkbox" checked={formData[key]} readOnly />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>{translations.otherComorbidity}</label>
            <input type="text" value={formData.other_comorbidity} onChange={(e) => setFormData({ ...formData, other_comorbidity: e.target.value })} />
          </div>
        </div>

        {/* Section B */}
        <div className="section">
          <h2 className="section-title">📝 {translations.sectionB}</h2>
          
          {/* Mapping through questions q3 to q18 as q1 and q2 are derived */}
          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(num => {
            const qKey = `q${num}`;
            const qData = translations.questions[qKey];
            const qText = typeof qData === "string" ? qData : qData.text;
            const qOptions = qData.options || [translations.yes, translations.no];
            
            // Logic for option values
            let values = ["yes", "no"];
            if (num === 3) values = ["dark", "wheatish", "fair", "very_fair"];
            if (num === 4) values = ["shorts", "partial", "full"];
            if (num === 5) values = ["negligible", "less_30", "more_30"];
            if (num === 8) values = ["no_intake", "occasional", "regular"];
            if (num >= 13 && num <= 17) values = ["often", "sometimes", "no"];

            return (
              <div key={qKey} className={`form-group ${errorField === qKey ? 'has-error' : ''}`} id={`group-${qKey}`}>
                <label className="q-label">{qText} *</label>
                <select 
                  value={formData[qKey]} 
                  onChange={(e) => {
                    setFormData({ ...formData, [qKey]: e.target.value });
                    if (errorField === qKey) setErrorField(null);
                  }}
                >
                  <option value="">{translations.select}</option>
                  {qOptions.map((opt, i) => (
                    <option key={i} value={values[i]}>{opt}</option>
                  ))}
                </select>
                {errorField === qKey && <span className="error-msg">Please select an option</span>}
              </div>
            );
          })}
        </div>

        <div className="button-group">
          <button className="btn-reset" onClick={handleReset}>Reset Form</button>
          <button className="btn-calculate" onClick={handleCalculateScore}>Submit</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="modal-title">Success!</h2>
            <p className="modal-text">
              Thank you for submitting the form. You will receive the results through WhatsApp.
            </p>
            <button className="modal-btn" onClick={() => { setShowModal(false); handleReset(); window.scrollTo(0, 0); }}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandaloneQuestionnaire;
