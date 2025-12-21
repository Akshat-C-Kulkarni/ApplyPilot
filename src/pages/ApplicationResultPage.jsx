import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';

const ApplicationResultPage = () => {
    const navigate = useNavigate();
    const { resetSimulation, userData } = useAppContext();
    const latestJob = userData.appliedJobs[userData.appliedJobs.length - 1];

    const handleReturn = () => {
        // Navigate first to avoid the ProtectedRoute check in this component
        // which redirects to '/' if state changes from COMPLETED
        navigate('/dashboard/jobseeker');
        setTimeout(() => {
            resetSimulation();
        }, 100);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderBar />

            <main className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div id="applicationSummaryCard" style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '40px',
                    textAlign: 'center',
                    maxWidth: '500px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: '2rem',
                        color: 'var(--success)'
                    }}>
                        ✔
                    </div>

                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Application Submitted!</h2>
                    <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '500' }}>
                        {latestJob?.jobTitle || 'Senior React Developer'} at {latestJob?.company || 'TechCorp'}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
                        The agent successfully customized your resume and submitted the application form for the <strong>{latestJob?.jobTitle}</strong> position. A confirmation email has been sent to you.
                    </p>

                    <PrimaryButton id="returnToMonitoringButton" onClick={handleReturn} style={{ margin: '0 auto' }}>
                        Return to Monitoring
                    </PrimaryButton>
                </div>
            </main>
        </div>
    );
};

export default ApplicationResultPage;
