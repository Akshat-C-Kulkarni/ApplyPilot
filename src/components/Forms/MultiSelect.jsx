import React from 'react';

// Simplified MultiSelect visualization (no complex library)
const MultiSelect = ({ label, id, placeholder, required, value = [], onChange, error }) => {
    // Value is array of strings. onChange receives new array.
    // For prototype, we'll treat it as a comma-separated text input that parses into an array on blur/change
    // to keep it simple but functional without heavy libraries, or better:
    // A text input where hitting enter adds a tag.

    // Actually, simpler: Preset clickable options + text input.
    // Let's implement a clean "Tag Input" style.

    const [inputValue, setInputValue] = React.useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = inputValue.trim();
            if (val && !value.includes(val)) {
                onChange([...value, val]);
                setInputValue('');
            }
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

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
            <div style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: error ? '1px solid var(--danger)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                minHeight: '48px'
            }}>
                {value.map(tag => (
                    <span key={tag} style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: 'var(--text-primary)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            style={{
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '1.1rem',
                                lineHeight: '0.8'
                            }}
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    id={id}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={value.length === 0 ? placeholder : ""}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        flex: 1,
                        minWidth: '120px',
                        padding: '4px'
                    }}
                />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                Type and press Enter to add multiple locations
            </div>
            {error && (
                <span style={{ display: 'block', marginTop: '4px', color: 'var(--danger)', fontSize: '0.85rem' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default MultiSelect;
