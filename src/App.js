import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* Pages */
import ThankYouPage from './pages/ThankYouPage';
import DashboardPage from './pages/DashboardPage';
import AddFamilyPage from './pages/AddFamilyPage';
import CouponPage from './pages/CouponPage';
import DetailedReportPage from './pages/DetailedReportPage';
import FamilyListPage from './pages/FamilyListPage';
import StandaloneQuestionnaire from './pages/StandaloneQuestionnaire';
import D3CampaignData from './pages/D3CampaignData';
/* Global Styles */
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page is Thank You Page */}
        <Route path="/" element={<ThankYouPage />} />
        
        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Add Family Member */}
        <Route path="/add-family" element={<AddFamilyPage />} />
        
        {/* Coupon Screen */}
        <Route path="/coupon" element={<CouponPage />} />
        
        {/* Detailed Report */}
        <Route path="/report" element={<DetailedReportPage />} />
        
        {/* Family List */}
        <Route path="/family-list" element={<FamilyListPage />} />

        {/* Vitamin D Questionnaire */}
        <Route path="/questionnaire" element={<StandaloneQuestionnaire />} />

        {/* D3 Campaign Data */}
        <Route path="/d3-campaign-data" element={<D3CampaignData />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
