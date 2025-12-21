import React from 'react';
import { AgentState } from '../context/AppContext';

const AgentStatusBadge = ({ state }) => {
    let color = '#71717a'; // Default gray
    let bg = '#27272a';

    switch (state) {
        case AgentState.MONITORING:
        case AgentState.APPLYING:
            color = '#10b981'; // Green
            bg = 'rgba(16, 185, 129, 0.1)';
            break;
        case AgentState.PAUSED:
            color = '#f59e0b'; // Amber
            bg = 'rgba(245, 158, 11, 0.1)';
            break;
        case AgentState.COMPLETED:
            color = '#3b82f6'; // Blue
            bg = 'rgba(59, 130, 246, 0.1)';
            break;
        case AgentState.CONFIGURING:
        case AgentState.AWAITING_ACTIVATION:
        case AgentState.NOT_INITIALIZED:
        default:
            color = '#a1a1aa';
            bg = 'rgba(161, 161, 170, 0.1)';
            break;
    }

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: bg,
            color: color,
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.02em',
            border: `1px solid ${color}33` // 20% opacity border
        }}>
            {/* Pulse effect for active states */}
            {(state === AgentState.MONITORING || state === AgentState.APPLYING) && (
                <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: '8px',
                    boxShadow: `0 0 8px ${color}`,
                    animation: 'pulse 2s infinite'
                }}></span>
            )}
            {state}
            <style>{`
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default AgentStatusBadge;
