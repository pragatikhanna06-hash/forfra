import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import ServicesPage from "./ServicesPage";

import DataSecurityPage from "./pages/services/DataSecurityPage";
import Forensicaudit from "./pages/services/Forensicaudit";
import Digitalforensicspage from "./pages/services/Digitalforensicspage";
import Fraudinvestigationpage from "./pages/services/Fraudinvestigationpage";
// import InvestigationsPage from "./pages/services/Investigationspage";
import LegalConsultationPage from "./pages/services/LegalConsultationPage";
// import DocumentExaminationPage from "./pages/services/DocumentExaminationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Services overview page (all service cards + detail sections) */}
        <Route path="/services" element={<ServicesPage />} />

        {/* Dedicated service pages — each one opens on its own route */}
        <Route path="/services/data-security" element={<DataSecurityPage />} />
        <Route path="/services/forensic-audit" element={<Forensicaudit />} />
        <Route path="/services/digital-forensics" element={<Digitalforensicspage />} />
        <Route path="/services/fraud-investigation" element={<Fraudinvestigationpage />} />
        {/* <Route path="/services/investigations" element={<InvestigationsPage />} /> */}
        <Route path="/services/legal-consultation" element={<LegalConsultationPage />} />
        {/* <Route path="/services/document-examination" element={<DocumentExaminationPage />} /> */}

        {/* fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
