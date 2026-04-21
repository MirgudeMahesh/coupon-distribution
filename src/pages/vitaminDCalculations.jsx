/**
 * Pure utility functions for Vitamin D assessment calculations
 * NO external dependencies - works anywhere!
 */

/**
 * Calculate BMI from weight and height
 * @param weightKg - Weight in kilograms
 * @param heightM - Height in meters
 * @returns BMI rounded to 2 decimal places
 */
export const calculateBMI = (weightKg, heightM) => {
  if (heightM <= 0 || weightKg <= 0) return 0;
  return Math.round((weightKg / (heightM * heightM)) * 100) / 100;
};

/**
 * Determine risk level based on total score
 * @param totalScore - Total questionnaire score
 * @returns Risk level string
 */
export const getRiskLevel = (totalScore) => {
  return totalScore < 5 ? "Adequate" : "Inadequate";
};

/**
 * Calculate Section B score based on questionnaire responses
 * @param formData - Questionnaire responses
 * @param age - Patient age
 * @param bmi - Patient BMI
 * @returns Total score
 */
export const calculateSectionBScore = (
  formData,
  age,
  bmi
) => {
  let score = 0;

  // Q1: Age > 50?
  if (formData.q1 === "yes" || age > 50) score += 0.5;

  // Q2: BMI ≥ 30?
  if (formData.q2 === "yes" || bmi >= 30) score += 1;

  // Q3: Skin tone
  const skinToneScores = {
    dark: 0,
    wheatish: 0.25,
    fair: 0.75,
    very_fair: 1,
  };
  score += skinToneScores[formData.q3] || 0;

  // Q4: Clothing style
  const clothingScores = {
    shorts: 0,
    partial: 1,
    full: 3,
  };
  score += clothingScores[formData.q4] || 0;

  // Q5: Time outdoors
  const outdoorScores = {
    more_30: 0,
    less_30: 2,
    negligible: 3,
  };
  score += outdoorScores[formData.q5] || 0;

  // Q6: Sunscreen (Yes/No)
  if (formData.q6 === "yes") score += 1;

  // Q7: Pollution (Yes/No)
  if (formData.q7 === "yes") score += 1;

  // Q8: Animal foods
  const foodScores = {
    no_intake: 1,
    occasional: 0.5,
    regular: 0,
  };
  score += foodScores[formData.q8] || 0;

  // Q9-Q12: Yes/No (each Yes = +1)
  ["q9", "q10", "q11", "q12"].forEach((q) => {
    if (formData[q] === "yes") score += 1;
  });

  // Q13-Q17: No/Sometimes/Often (0, 0.25, 0.5)
  ["q13", "q14", "q15", "q16", "q17"].forEach((q) => {
    if (formData[q] === "sometimes") score += 0.25;
    else if (formData[q] === "often") score += 0.5;
  });

  // Q18: Vitamin D supplementation (Yes = -5)
  if (formData.q18 === "yes") score -= 5;

  // Ensure score is not negative
  return Math.max(0, score);
};

/**
 * Generate assessment report as a formatted string
 * @param patientData - Patient information
 * @returns Formatted assessment report
 */
export const generateAssessmentReport = (patientData) => {
  const comorbidityText = patientData.comorbidities.length
    ? patientData.comorbidities.join("\n")
    : "• None";

  return `
--------------------------
 Vitamin D Assessment
--------------------------
Patient: ${patientData.initials}
Age: ${patientData.age}   Gender: ${patientData.gender}
Height: ${patientData.height_feet}'${patientData.height_inches}"
Weight: ${patientData.weight_kg}kg
BMI: ${patientData.bmi.toFixed(1)}

Comorbidities:
${comorbidityText}

Total Score: ${patientData.totalScore}
Risk Level: ${patientData.riskLevel}

--------------------------
ADEQUACY GUIDE:
< 5   → Adequate
≥ 5   → Inadequate
--------------------------
This is a screening test 
and not a substitute for
a diagnostic test.Please 
consult your doctor for 
interpretation and 
appropriate treatment.`;
};

/**
 * Get badge variant based on risk level (for UI styling)
 * @param riskLevel - Patient risk level
 * @returns Badge variant
 */
export const getRiskBadgeVariant = (riskLevel) => {
  switch (riskLevel) {
    case "Adequate":
      return "secondary";
    case "Inadequate":
      return "destructive";
    default:
      return "outline";
  }
};

/**
 * Validate patient form data
 * @param formData - Patient form data
 * @returns True if valid, false otherwise
 */
export const validatePatientFormData = (formData) => {
  return !!(
    formData.initials?.trim() &&
    formData.age &&
    Number(formData.age) > 0 &&
    Number(formData.age) <= 120 &&
    formData.gender &&
    formData.weight_kg &&
    Number(formData.weight_kg) > 0
  );
};

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
