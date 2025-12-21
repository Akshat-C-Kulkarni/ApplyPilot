import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import HeaderBar from '../components/HeaderBar';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';

const RecruiterDashboardPage = () => {
    const navigate = useNavigate();
    const { user, jobFeed, deleteJob } = useAppContext();

    const hasJobs = jobFeed.length > 0;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', width: '100%' }}>
            <HeaderBar />
            <main className="container" style={{ flex: 1, paddingTop: '24px', paddingBottom: '24px' }}>

                {/* Page Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '16px'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2px' }}>Recruiter Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            Pipeline management for {user?.email}
                        </p>
                    </div>

                    <PrimaryButton
                        id="addJobPostingButton"
                        onClick={() => navigate('/recruiter/post-job')}
                    >
                        + Create Job
                    </PrimaryButton>
                </div>

                {/* Main View Grid: Uses much more screen real estate */}
                {hasJobs ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))',
                        gap: '20px'
                    }}>
                        {jobFeed.map((job, idx) => (
                            <div key={idx} style={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-md)',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px'
                            }}>
                                {/* Job Card Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{job.title}</h4>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                                            {job.company} • {job.location}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                                            {job.applicants ? job.applicants.length : 0} Candidates
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
                                                    deleteJob(job.id);
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
                                                transition: 'color 0.2s, background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--error)';
                                                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'var(--text-tertiary)';
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                            title="Delete Job"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Applicant Table */}
                                <div style={{
                                    backgroundColor: 'var(--bg-primary)',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-subtle)',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1.2fr 2fr 100px 80px',
                                        padding: '8px 12px',
                                        borderBottom: '1px solid var(--border-subtle)',
                                        backgroundColor: 'var(--bg-tertiary)',
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        color: 'var(--text-tertiary)',
                                        textTransform: 'uppercase'
                                    }}>
                                        <span>Candidate</span>
                                        <span>Skills / Matches</span>
                                        <span style={{ textAlign: 'right' }}>Suitability</span>
                                    </div>

                                    {(!job.applicants || job.applicants.length === 0) ? (
                                        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                                            Waiting for autonomous applications...
                                        </div>
                                    ) : (
                                        job.applicants.map((applicant, aIdx) => (
                                            <div key={aIdx} style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1.2fr 2fr 100px 80px', // Adjusted to fit button
                                                padding: '10px 12px',
                                                borderBottom: aIdx < job.applicants.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{applicant.email.split('@')[0]}</div>
                                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                    {applicant.skills.slice(0, 4).map((skill, sIdx) => (
                                                        <span key={sIdx} style={{ fontSize: '0.6rem', padding: '2px 6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '3px', border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    {applicant.originalResumeUrl && (
                                                        <a
                                                            href={applicant.originalResumeUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '600' }}
                                                        >
                                                            📄 Original PDF
                                                        </a>
                                                    )}
                                                    {applicant.resumeUrl && (
                                                        <a
                                                            href={applicant.resumeUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ fontSize: '0.65rem', color: 'var(--success)', textDecoration: 'none', fontWeight: '600' }}
                                                        >
                                                            ✨ Enhanced
                                                        </a>
                                                    )}
                                                </div>
                                                <div style={{ textAlign: 'right', fontWeight: '800', color: applicant.suitability >= 80 ? 'var(--success)' : 'var(--text-primary)', fontSize: '0.9rem' }}>
                                                    {applicant.suitability}%
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <div style={{
                            backgroundColor: 'var(--bg-secondary)',
                            padding: '32px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-subtle)',
                            textAlign: 'center',
                            maxWidth: '400px'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No Active Postings</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                Set up your first job to see the agent in action.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default RecruiterDashboardPage;
