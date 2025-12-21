import React from 'react';

const PrimaryButton = ({
    children,
    onClick,
    disabled = false,
    isLoading = false,
    type = 'button',
    id,
    style = {}
}) => {
    return (
        <button
            id={id}
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            style={{
                backgroundColor: (disabled || isLoading) ? '#27272a' : 'var(--accent-primary)',
                color: (disabled || isLoading) ? '#71717a' : 'white',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: (disabled || isLoading) ? 0.7 : 1,
                width: 'fit-content',
                ...style // Allow overrides
            }}
            onMouseOver={(e) => {
                if (!disabled && !isLoading) e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }}
            onMouseOut={(e) => {
                if (!disabled && !isLoading) e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            }}
        >
            {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.8s linear infinite'
                    }}></span>
                    Processing...
                </span>
            ) : children}
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </button>
    );
};

export default PrimaryButton;
