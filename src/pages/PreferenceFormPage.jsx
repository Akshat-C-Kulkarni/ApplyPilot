import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import TextInput from '../components/Forms/TextInput';
import Dropdown from '../components/Forms/Dropdown';
import MultiSelect from '../components/Forms/MultiSelect';
import EmailInput from '../components/Forms/EmailInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';

const PreferenceFormPage = () => {
    const navigate = useNavigate();
    const { updatePreferences } = useAppContext();

    // Form State
    const [formData, setFormData] = useState({
        jobRole: '',
        experienceLevel: '',
        locations: [],
        jobType: '',
        email: ''
    });

    // Validation State
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.jobRole.trim()) newErrors.jobRole = 'Job role is required';
        if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        if (formData.locations.length === 0) newErrors.locations = 'At least one location is required';
        if (!formData.jobType) newErrors.jobType = 'Job type is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            updatePreferences(formData);
            navigate('/onboarding/resume');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <HeaderBar />

            <main className="container" style={{ flex: 1, paddingTop: '48px', paddingBottom: '48px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Job Preferences</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                        Tell your agent what kind of roles to look for.
                    </p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <TextInput
                            id="jobRoleInput"
                            label="Target Job Role"
                            placeholder="e.g. Machine Learning Engineer"
                            required
                            value={formData.jobRole}
                            onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                            error={errors.jobRole}
                        />

                        <Dropdown
                            id="experienceLevelSelect"
                            label="Experience Level"
                            options={['Fresher', '0–2 years', '2–5 years', '5+ years']}
                            required
                            value={formData.experienceLevel}
                            onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                            error={errors.experienceLevel}
                        />

                        <MultiSelect
                            id="locationInput"
                            label="Preferred Locations"
                            placeholder="Type and press Enter (e.g. Remote)"
                            required
                            value={formData.locations}
                            onChange={(vals) => setFormData({ ...formData, locations: vals })}
                            error={errors.locations}
                        />

                        <Dropdown
                            id="jobTypeSelect"
                            label="Job Type"
                            options={['Full-time', 'Internship', 'Contract']}
                            required
                            value={formData.jobType}
                            onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                            error={errors.jobType}
                        />

                        <EmailInput
                            id="emailInput"
                            label="Notification Email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                        />

                        <div style={{ marginTop: '32px' }}>
                            <PrimaryButton
                                id="savePreferencesButton"
                                onClick={handleSubmit}
                                disabled={Object.keys(errors).length > 0 && false} // Just relies on click validation
                            >
                                Save & Continue
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default PreferenceFormPage;
