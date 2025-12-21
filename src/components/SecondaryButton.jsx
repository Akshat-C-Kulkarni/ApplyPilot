import React from 'react';

const SecondaryButton = ({
    children,
    onClick,
    disabled = false,
    id,
    style = {}
}) => {
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontWeight: '500',
                fontSize: '0.85rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: disabled ? 0.5 : 1,
                width: 'fit-content',
                ...style
            }}
            onMouseOver={(e) => {
                if (!disabled) {
                    e.currentTarget.style.borderColor = 'var(--text-primary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                }
            }}
            onMouseOut={(e) => {
                if (!disabled) {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                }
            }}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
