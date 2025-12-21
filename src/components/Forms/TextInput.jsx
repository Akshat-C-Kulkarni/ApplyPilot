import React from 'react';

const TextInput = ({ label, id, placeholder, required, value, onChange, error }) => {
    return (
        <div style={{ marginBottom: '16px', width: '100%' }}>
            {label && (
                <label htmlFor={id} style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                }}>
                    {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
                </label>
            )}
            <input
                type="text"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: error ? '1px solid var(--danger)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border-subtle)'}
            />
            {error && (
                <span style={{ display: 'block', marginTop: '4px', color: 'var(--danger)', fontSize: '0.85rem' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default TextInput;
