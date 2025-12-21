import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import TextInput from '../components/Forms/TextInput';
import MultiSelect from '../components/Forms/MultiSelect';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';

const JobPostingFormPage = () => {
    const navigate = useNavigate();
    const { postJob } = useAppContext();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        skills: [],
        location: ''
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.title) newErrors.title = "Job title is required";
        if (!formData.company) newErrors.company = "Company name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
        if (!formData.location) newErrors.location = "Location is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        postJob(formData);
        // Show success message (simulated via alert or simple redirect logic as per spec)
        // Spec says "Show success message: Job posted successfully" then redirect.
        alert("Job posted successfully");
        navigate('/dashboard/recruiter');
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
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Post a New Job</h2>

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id="jobTitleInput"
                            label="Job Title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            error={errors.title}
                        />
                        <TextInput
                            id="companyNameInput"
                            label="Company Name"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            error={errors.company}
                        />

                        {/* TextArea replacement using basic CSS since we don't have a component for it */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Job Description <span style={{ color: 'var(--danger)' }}>*</span>
                            </label>
                            <textarea
                                id="jobDescriptionInput"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '12px',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    border: errors.description ? '1px solid var(--danger)' : '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />
                            {errors.description && <span style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{errors.description}</span>}
                        </div>

                        <MultiSelect
                            id="requiredSkillsInput"
                            label="Required Skills"
                            placeholder="Type and press Enter"
                            required
                            value={formData.skills}
                            onChange={(vals) => setFormData({ ...formData, skills: vals })}
                            error={errors.skills}
                        />

                        <TextInput
                            id="jobLocationInput"
                            label="Job Location"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            error={errors.location}
                        />

                        <div style={{ marginTop: '24px' }}>
                            <PrimaryButton id="submitJobPostingButton" type="submit">
                                Post Job
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default JobPostingFormPage;
