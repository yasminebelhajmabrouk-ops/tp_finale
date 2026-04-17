import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Observations from './pages/Observations';
import Practitioners from './pages/Practitioners';
import Encounters from './pages/Encounters';
import Conditions from './pages/Conditions';
import Procedures from './pages/Procedures';
import Medications from './pages/Medications';
import MedicationRequests from './pages/MedicationRequests';
import Allergies from './pages/Allergies';
import Immunizations from './pages/Immunizations';
import CarePlans from './pages/CarePlans';
import DiagnosticReports from './pages/DiagnosticReports';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/observations" element={<Observations />} />
              <Route path="/practitioners" element={<Practitioners />} />
              <Route path="/encounters" element={<Encounters />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/procedures" element={<Procedures />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/medication-requests" element={<MedicationRequests />} />
              <Route path="/allergies" element={<Allergies />} />
              <Route path="/immunizations" element={<Immunizations />} />
              <Route path="/care-plans" element={<CarePlans />} />
              <Route path="/diagnostic-reports" element={<DiagnosticReports />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
