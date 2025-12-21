import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';

const ResumeConfirmationPage = () => {
    const navigate = useNavigate();
    const { userData, activateAgent } = useAppContext();
    const { resume, preferences } = userData;

    if (!resume) {
        // Fallback for direct access without data
        return (
            <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column', gap: '16px' }}>
                <p>Resume data unavailable.</p>
                <button onClick={() => navigate('/onboarding/resume')} style={{ color: 'var(--accent-primary)' }}>
                    Go to Upload
                </button>
            </div>
        );
    }

    const handleConfirm = () => {
        activateAgent();
        navigate('/dashboard/monitoring');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderBar />

            <main className="container" style={{ flex: 1, paddingTop: '48px', paddingBottom: '48px', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Review & Activate</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                    {/* Resume Summary */}
                    <div id="resumeSummaryPanel" style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-secondary)' }}>Parsed Resume Data</h3>

                        {/* 1. Target Role */}
                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Target Role</h4>
                            <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{preferences?.jobRole || 'Not specified'}</p>
                        </div>

                        {/* 2. Top Skills */}
                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Top Skills</h4>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {resume.skills.map(skill => (
                                    <span key={skill} style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        fontSize: '0.85rem',
                                        border: '1px solid var(--border-subtle)'
                                    }}>{skill}</span>
                                ))}
                            </div>
                        </div>

                        {/* 3. Job Type */}
                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Job Type</h4>
                            <p>{preferences?.jobType || 'Not specified'}</p>
                        </div>

                        {/* 4. Experience */}
                        <div style={{ marginBottom: '24px' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>Experience</h4>
                            <p>{preferences?.experienceLevel || 'Not specified'}</p>
                        </div>
                    </div>

                    {/* Action Panel */}
                    <div>
                        <div style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '24px',
                            position: 'sticky',
                            top: '100px'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Ready to start?</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
                                By activating, you authorize the agent to monitor job feeds and submit applications matching your profile.
                            </p>

                            <PrimaryButton
                                id="confirmActivateButton"
                                onClick={handleConfirm}
                            >
                                Confirm & Activate Agent
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ResumeConfirmationPage;
