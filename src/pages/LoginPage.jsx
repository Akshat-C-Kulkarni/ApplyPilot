import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import EmailInput from '../components/Forms/EmailInput';
import TextInput from '../components/Forms/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext, UserRole } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAppContext();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.role) newErrors.role = 'Please select a role';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        login(formData.email, formData.role);

        if (formData.role === UserRole.JOB_SEEKER) {
            navigate('/dashboard/jobseeker');
        } else if (formData.role === UserRole.RECRUITER) {
            navigate('/dashboard/recruiter');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderBar />
            <main className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px',
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', textAlign: 'center' }}>Login to ApplyPilot</h2>

                    <form onSubmit={handleSubmit}>
                        <EmailInput
                            id="loginEmailInput"
                            label="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                        />

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Password <span style={{ color: 'var(--danger)' }}>*</span>
                            </label>
                            <input
                                id="loginPasswordInput"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    border: errors.password ? '1px solid var(--danger)' : '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem'
                                }}
                            />
                            {errors.password && <span style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{errors.password}</span>}
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                I am a: <span style={{ color: 'var(--danger)' }}>*</span>
                            </label>

                            <div id="userRoleSelect" style={{ display: 'flex', gap: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={UserRole.JOB_SEEKER}
                                        checked={formData.role === UserRole.JOB_SEEKER}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    />
                                    Job Seeker
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={UserRole.RECRUITER}
                                        checked={formData.role === UserRole.RECRUITER}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    />
                                    Recruiter
                                </label>
                            </div>
                            {errors.role && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>{errors.role}</span>}
                        </div>

                        <PrimaryButton id="loginSubmitButton" type="submit">
                            Login
                        </PrimaryButton>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
