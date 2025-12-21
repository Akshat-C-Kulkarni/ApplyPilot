import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import HeaderBar from '../components/HeaderBar';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext, EventCategory } from '../context/AppContext';

const JobSeekerDashboardPage = () => {
    const navigate = useNavigate();
    const { user, userData, jobFeed, applyToJob, deleteApplication, addLog } = useAppContext();

    const handleAnalyzeApply = () => {
        addLog(EventCategory.JOB_DETECTION, "Analyzing available jobs for matches...");
        jobFeed.forEach(job => applyToJob(job));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', width: '100%' }}>
            <HeaderBar />
            <main className="container" style={{ flex: 1, paddingTop: '24px', paddingBottom: '24px' }}>

                {/* Header Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '16px'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2px' }}>Job Seeker Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            User: {user?.email}
                        </p>
                    </div>

                    <PrimaryButton
                        id="addJobPreferenceButton"
                        onClick={() => navigate('/onboarding/preferences')}
                    >
                        + Job Preference
                    </PrimaryButton>
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>

                    {/* Left Pillar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Autonomous Agent Control */}
                        <div style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '20px',
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px' }}>AI Agent Control</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.75rem' }}>
                                Scan jobs and apply autonomously.
                            </p>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <PrimaryButton
                                    id="analyzeApplyButton"
                                    onClick={handleAnalyzeApply}
                                    style={{ padding: '6px 16px', fontSize: '0.75rem' }}
                                    disabled={!userData.resume}
                                >
                                    Analyze & Apply
                                </PrimaryButton>
                                {!userData.resume && (
                                    <span style={{ fontSize: '0.65rem', color: 'var(--warning)' }}>⚠ Resume Req.</span>
                                )}
                            </div>
                        </div>

                        {/* Skills Portfolio Card */}
                        <div style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '20px',
                        }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px' }}>My Skills</h3>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {userData.skills.map((skill, idx) => (
                                    <span key={idx} style={{
                                        padding: '3px 8px',
                                        backgroundColor: 'var(--bg-tertiary)',
                                        borderRadius: '4px',
                                        border: '1px solid var(--border-subtle)',
                                        fontSize: '0.7rem',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Pillar */}
                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '24px',
                        minHeight: '600px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Applications Pipeline</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{userData.appliedJobs.length} Active Tracking</span>
                        </div>

                        {userData.appliedJobs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                                Application history is currently empty.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                                {userData.appliedJobs.map((app, idx) => (
                                    <div key={idx} className="job-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{app.jobTitle}</h4>
                                                <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '600' }}>{app.company}</p>
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                color: 'var(--success)',
                                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                                padding: '4px 8px',
                                                borderRadius: '6px'
                                            }}>
                                                {app.suitability}% Match
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Are you sure you want to remove ${app.jobTitle}?`)) {
                                                        deleteApplication(app.jobId);
                                                    }
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--text-tertiary)',
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '4px',
                                                    marginLeft: '8px',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = 'var(--danger)';
                                                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = 'var(--text-tertiary)';
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }}
                                                title="Delete Preference"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                                            <span>📍 {app.location || 'Remote'}</span>
                                            <span>•</span>
                                            <span>🕒 {app.timestamp}</span>
                                        </div>

                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.5',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: '3',
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {app.description || 'No description available.'}
                                        </div>

                                        {app.requiredSkills && app.requiredSkills.length > 0 && (
                                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                                                {app.requiredSkills.map((skill, sIdx) => (
                                                    <span key={sIdx} style={{
                                                        padding: '2px 8px',
                                                        backgroundColor: 'var(--bg-secondary)',
                                                        borderRadius: '4px',
                                                        fontSize: '0.7rem',
                                                        color: 'var(--text-tertiary)',
                                                        border: '1px solid var(--border-subtle)'
                                                    }}>
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ marginTop: '12px' }}>
                                            <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '2px', marginBottom: '8px' }}>
                                                <div style={{
                                                    width: '25%', height: '100%',
                                                    backgroundColor: 'var(--accent-primary)', borderRadius: '2px'
                                                }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-tertiary)', fontWeight: '600', letterSpacing: '0.05em' }}>
                                                <span style={{ color: 'var(--accent-primary)' }}>APPLIED</span>
                                                <span>SCREEN</span>
                                                <span>INTERVIEW</span>
                                                <span>OFFER</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobSeekerDashboardPage;
