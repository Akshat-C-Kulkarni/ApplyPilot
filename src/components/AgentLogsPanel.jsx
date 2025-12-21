import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const AgentLogsPanel = () => {
    const { logs } = useAppContext();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div id="agentLogsPanel" style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            height: '300px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            {logs.length === 0 && (
                <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                    Waiting for agent activity...
                </div>
            )}
            {logs.map((log, index) => (
                <div key={index} style={{
                    display: 'flex',
                    gap: '12px',
                    color: log.severity === 'ERROR' ? 'var(--danger)' :
                        log.severity === 'WARNING' ? 'var(--warning)' : 'var(--text-secondary)'
                }}>
                    <span style={{ color: 'var(--text-tertiary)', minWidth: '70px' }}>[{log.timestamp}]</span>
                    <span style={{ color: 'var(--accent-primary)', minWidth: '120px' }}>[{log.category}]</span>
                    <span style={{ color: 'var(--text-tertiary)', minWidth: '100px' }}>[{log.state}]</span>
                    <span style={{ color: log.severity === 'ERROR' ? 'var(--danger)' : 'var(--text-primary)' }}>
                        {log.message}
                    </span>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default AgentLogsPanel;
