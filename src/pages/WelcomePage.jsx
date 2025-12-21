import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext, AgentState } from '../context/AppContext';

const WelcomePage = () => {
    const navigate = useNavigate();
    const { setAgentState } = useAppContext();

    const handleStart = () => {
        // Navigate to login
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', flexDirection: 'column', textAlign: 'center', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }}></div>

            {/* Top Right Login Button */}
            <button
                onClick={handleLogin}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 10,
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                }}
            >
                Login
            </button>

            <div style={{ zIndex: 1, padding: '0 24px' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '24px',
                    color: 'var(--accent-primary)',
                    fontWeight: '500',
                    fontSize: '0.9rem'
                }}>
                    Autonomous Job Application Agent
                </div>

                <h1 id="welcomeTitle" style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    marginBottom: '24px',
                    lineHeight: '1.1',
                    background: 'linear-gradient(to bottom right, white, #a1a1aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    ApplyPilot
                </h1>

                <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto 48px',
                    lineHeight: '1.6'
                }}>
                    Your personal AI agent that monitors job feeds, evaluates relevance,
                    and submits applications on your behalf — fully autonomously.
                </p>

                <div style={{ width: '200px', margin: '0 auto' }}>
                    <PrimaryButton id="getStartedButton" onClick={handleStart}>
                        Get Started →
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
