import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, AgentState, UserRole } from './context/AppContext';

// Pages
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import JobSeekerDashboardPage from './pages/JobSeekerDashboardPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import JobPostingFormPage from './pages/JobPostingFormPage';
// Job Seeker Flow Pages
import PreferenceFormPage from './pages/PreferenceFormPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import ResumeConfirmationPage from './pages/ResumeConfirmationPage';
import MonitoringDashboardPage from './pages/MonitoringDashboardPage';
import ApplicationResultPage from './pages/ApplicationResultPage';

// Guard Component
const ProtectedRoute = ({ children, check, allowedRoles }) => {
  const { agentState, userData, user } = useAppContext();
  const location = useLocation();

  // 1. Role Check
  if (allowedRoles) {
    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard if role mismatch
      if (user.role === UserRole.JOB_SEEKER) return <Navigate to="/dashboard/jobseeker" replace />;
      if (user.role === UserRole.RECRUITER) return <Navigate to="/dashboard/recruiter" replace />;
      return <Navigate to="/login" replace />;
    }
  }

  // 2. Custom Check (Constraint Logic)
  if (check) {
    if (!check(agentState, userData, user)) {
      // Fallback redirects
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

const App = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't show logout on Welcome page or Login page if user somehow navigates there while logged in (though they should be redirected)
  // Actually, standard practice is just to show it if logged in.
  const showLogout = !!user;

  return (
    <>
      {showLogout && (
        <button
          onClick={handleLogout}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '8px 16px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Logout
        </button>
      )}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- Job Seeker Routes --- */}
        <Route path="/dashboard/jobseeker" element={
          <ProtectedRoute allowedRoles={[UserRole.JOB_SEEKER]}>
            <JobSeekerDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/onboarding/preferences" element={
          <ProtectedRoute
            allowedRoles={[UserRole.JOB_SEEKER]}
            check={(state, data) => state !== AgentState.NOT_INITIALIZED || true} // Relaxed check for now as entry via Dashboard
          >
            <PreferenceFormPage />
          </ProtectedRoute>
        } />

        <Route path="/onboarding/resume" element={
          <ProtectedRoute
            allowedRoles={[UserRole.JOB_SEEKER]}
            check={(state, data) => !!data.preferences}
          >
            <ResumeUploadPage />
          </ProtectedRoute>
        } />

        <Route path="/onboarding/confirm" element={
          <ProtectedRoute
            allowedRoles={[UserRole.JOB_SEEKER]}
            check={(state, data) => !!data.resume}
          >
            <ResumeConfirmationPage />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/monitoring" element={
          <ProtectedRoute
            allowedRoles={[UserRole.JOB_SEEKER]}
            check={(state) =>
              state === AgentState.MONITORING ||
              state === AgentState.PAUSED ||
              state === AgentState.APPLYING ||
              state === AgentState.COMPLETED
            }>
            <MonitoringDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/application-result" element={
          <ProtectedRoute
            allowedRoles={[UserRole.JOB_SEEKER]}
            check={(state) => state === AgentState.COMPLETED}
          >
            <ApplicationResultPage />
          </ProtectedRoute>
        } />

        {/* --- Recruiter Routes --- */}
        <Route path="/dashboard/recruiter" element={
          <ProtectedRoute allowedRoles={[UserRole.RECRUITER]}>
            <RecruiterDashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/recruiter/post-job" element={
          <ProtectedRoute allowedRoles={[UserRole.RECRUITER]}>
            <JobPostingFormPage />
          </ProtectedRoute>
        } />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
