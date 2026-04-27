import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './app/page';
import AlertsPage from './app/alerts/page';
import SupportPage from './app/support/page';
import PracticesPage from './app/practices/page';
import Dashboard from './app/dashboard/page';
import FAQPage from './app/faq/page';
import ContactPage from './app/contact/page';
import FeaturesPage from './app/features/page';
import LoginPage from './app/login/page';
import PatientsPage from './app/patients/page';
import PatientDetailPage from './app/patients/PatientDetail';
import PricingPage from './app/pricing/page';
import SignupPage from './app/signup/page';
import ThankYouPage from './app/thank-you/page';
import HowItWorksPage from './app/how-it-works/page';
import PrivacyPage from './app/privacy/page';
import TermsPage from './app/terms/page';
import CompliancePage from './app/compliance/page';
import { AuthProvider } from './lib/auth-context';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/practices" element={<PracticesPage />} />
            <Route path="/contact" element={<Navigate to="/support" replace />} />
            <Route path="/faq" element={<Navigate to="/support" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
          </Routes>
          <LoadingIndicator />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
