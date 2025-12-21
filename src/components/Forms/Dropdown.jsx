import React from 'react';

const Dropdown = ({ label, id, options, required, value, onChange, error }) => {
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
            <div style={{ position: 'relative' }}>
                <select
                    id={id}
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
                        appearance: 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border-subtle)'}
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'var(--text-tertiary)'
                }}>
                    ▼
                </div>
            </div>
            {error && (
                <span style={{ display: 'block', marginTop: '4px', color: 'var(--danger)', fontSize: '0.85rem' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Dropdown;
