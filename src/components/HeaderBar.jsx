import React from 'react';
import AgentStatusBadge from './AgentStatusBadge';
import { useAppContext } from '../context/AppContext';

const HeaderBar = () => {
    const { agentState } = useAppContext();

    return (
        <header style={{
            height: 'var(--nav-height)',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(10, 10, 10, 0.8)', // Glassmorphism backdrop
            backdropFilter: 'blur(8px)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginRight: '100px' }}>
                <h1 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    background: 'linear-gradient(to right, white, #a1a1aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    ApplyPilot
                </h1>
                <AgentStatusBadge state={agentState} />
            </div>
        </header>
    );
};

export default HeaderBar;
