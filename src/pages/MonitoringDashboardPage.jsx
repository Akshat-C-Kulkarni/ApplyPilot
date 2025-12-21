import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import AgentLogsPanel from '../components/AgentLogsPanel';
import SecondaryButton from '../components/SecondaryButton';
import { useAppContext, AgentState } from '../context/AppContext';

const MonitoringDashboardPage = () => {
    const navigate = useNavigate();
    const { agentState, pauseAgent } = useAppContext();

    useEffect(() => {
        if (agentState === AgentState.COMPLETED) {
            navigate('/dashboard/application-result');
        }
    }, [agentState, navigate]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderBar />

            <main className="container" style={{ flex: 1, paddingTop: '32px', paddingBottom: '32px' }}>
                {/* Status Card */}
                <div id="agentStatusCard" style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                            {agentState === AgentState.PAUSED ? 'Agent is paused' : 'Agent is active'}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {agentState === AgentState.MONITORING ? 'Monitoring job feeds for new opportunities...' :
                                agentState === AgentState.APPLYING ? 'Processing a potential match...' :
                                    agentState === AgentState.PAUSED ? 'Resume execution to continue monitoring.' :
                                        'Waiting for instructions...'}
                        </p>
                    </div>

                    {(agentState === AgentState.MONITORING || agentState === AgentState.PAUSED) && (
                        <div style={{ width: '120px' }}>
                            <SecondaryButton
                                id="pauseResumeAgentButton"
                                onClick={pauseAgent}
                            >
                                {agentState === AgentState.PAUSED ? 'Resume' : 'Pause'}
                            </SecondaryButton>
                        </div>
                    )}
                </div>

                {/* Logs Section */}
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Live Activity Log</h3>
                    <AgentLogsPanel />
                </div>

                {agentState === AgentState.APPLYING && (
                    <div style={{
                        marginTop: '24px',
                        padding: '12px',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--accent-primary)',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        ⚠ Do not close this tab while the agent is applying.
                    </div>
                )}
            </main>
        </div>
    );
};

export default MonitoringDashboardPage;
