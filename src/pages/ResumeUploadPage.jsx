import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import FileUpload from '../components/Forms/FileUpload';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';

const ResumeUploadPage = () => {
    const navigate = useNavigate();
    const { uploadResume } = useAppContext();

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, parsing, success, error
    const [error, setError] = useState('');

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        setError('');
        setStatus('idle');
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');

        try {
            // Step 1: Parse PDF to Text
            setStatus('parsing');
            const { extractTextFromPDF } = await import('../utils/pdfParser');
            const { extractSkillsFromText } = await import('../utils/skillExtractor');
            const { extractSection } = await import('../utils/sectionExtractor');

            const text = await extractTextFromPDF(file);
            console.log("Extracted Text:", text.substring(0, 200) + "..."); // Debug log

            // Step 2: Extract Skills
            // Try to get a specific "Skills" section first
            const skillsSection = extractSection(text, 'skills');
            const skills = extractSkillsFromText(text, skillsSection);
            console.log("Extracted Skills:", skills);

            // Step 3: Enhance Resume
            setStatus('enhancing');
            const { enhanceResumeText } = await import('../utils/resumeEnhancer');
            const enhancedText = enhanceResumeText(text);

            // Step 4: Generate Enhanced PDF
            const { generatePDFFromText } = await import('../utils/pdfGenerator');
            const enhancedPdfUrl = generatePDFFromText(enhancedText);

            // Step 5: Construct Data
            const parsedData = {
                skills: skills.length > 0 ? skills : ['No skills detected'],
                education: extractSection(text, 'education') || 'Education details not found',
                experience: extractSection(text, 'experience') || 'Fresher',
                originalText: text,
                enhancedText: enhancedText,
                resumeUrl: enhancedPdfUrl, // Store the blob URL
                originalResumeUrl: URL.createObjectURL(file), // Capture the original file blob URL
                projects: []
            };

            uploadResume(file, parsedData);
            setStatus('success');

            // Auto navigate after success
            setTimeout(() => {
                navigate('/onboarding/confirm');
            }, 1000);

        } catch (err) {
            console.error(err);
            setError('Failed to parse resume. Please ensure it is a valid PDF.');
            setStatus('error');
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
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Upload Resume</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                        Your agent needs your resume to generate relevant applications.
                    </p>

                    <FileUpload
                        id="resumeUploadInput"
                        label="Resume (PDF)"
                        required
                        onFileSelect={handleFileSelect}
                        status={status}
                        error={error}
                    />

                    <div style={{ marginTop: '24px' }}>
                        <PrimaryButton
                            id="uploadResumeButton"
                            onClick={handleUpload}
                            disabled={!file}
                            isLoading={status === 'uploading' || status === 'parsing' || status === 'enhancing'}
                        >
                            {status === 'idle' || !status ? 'Upload & Analyze' :
                                status === 'uploading' ? 'Uploading...' :
                                    status === 'parsing' ? 'Analyzing...' :
                                        status === 'enhancing' ? 'Enhancing...' : 'Success'}
                        </PrimaryButton>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default ResumeUploadPage;
