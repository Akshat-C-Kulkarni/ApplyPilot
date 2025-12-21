import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const AgentState = {
  NOT_INITIALIZED: 'NotInitialized',
  CONFIGURING: 'Configuring',
  AWAITING_ACTIVATION: 'AwaitingActivation',
  MONITORING: 'Monitoring',
  APPLYING: 'Applying',
  COMPLETED: 'Completed',
  PAUSED: 'Paused',
};

export const EventCategory = {
  AGENT_STATE_CHANGE: 'agent_state_change',
  JOB_DETECTION: 'job_detection',
  JOB_EVALUATION: 'job_evaluation',
  DOCUMENT_GENERATION: 'document_generation',
  AUTOMATION_EXECUTION: 'automation_execution',
  NOTIFICATION: 'notification',
  ERROR: 'error',
};

export const UserRole = {
  JOB_SEEKER: 'JobSeeker',
  RECRUITER: 'Recruiter',
};

export const AppProvider = ({ children }) => {
  const [agentState, setAgentState] = useState(AgentState.NOT_INITIALIZED);
  const [logs, setLogs] = useState([]);

  // Auth State
  const [user, setUser] = useState(null); // { email, role }
  const [currentJob, setCurrentJob] = useState(null); // Tracking autonomous application

  const [userData, setUserData] = useState({
    preferences: { role: 'Software Engineer', location: 'Remote', salary: '120k' },
    resume: { summary: 'Experienced React developer' },
    skills: ['React', 'JavaScript', 'Node.js', 'CSS', 'HTML', 'Python'],
    appliedJobs: []
  });

  // Job Feed State (Shared between Recruiter and Agent)
  // SEEDED DATA FOR TESTING
  const [jobFeed, setJobFeed] = useState([
    {
      id: 'test-job-1',
      title: 'Senior Frontend Engineer',
      company: 'Vercel',
      description: 'Working on the next generation of web frameworks.',
      skills: ['React', 'JavaScript', 'Node.js'],
      location: 'Remote',
      applicants: []
    }
  ]);

  // Helper to add log
  const addLog = useCallback((category, message, severity = 'INFO') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLog = {
      timestamp,
      category,
      state: agentState, // Capture state at time of logging
      message,
      severity
    };

    setLogs(prev => [...prev, newLog]);
    return newLog;
  }, [agentState]);

  // Simulation Loop
  useEffect(() => {
    let timeoutId;

    if (agentState === AgentState.MONITORING) {
      // Simulate polling
      timeoutId = setTimeout(() => {
        addLog(EventCategory.JOB_DETECTION, "Polling job feed...");

        // Check for recruiter posted jobs first
        // Enhanced: Filter for jobs we haven't applied to yet
        const unappliedJobs = jobFeed.filter(job =>
          !userData.appliedJobs.some(app => app.jobId === job.id)
        );

        const potentialJob = unappliedJobs.length > 0 ? unappliedJobs[unappliedJobs.length - 1] : null;

        // 50% chance to find a job after polling OR find the recruiter posted job
        if (potentialJob || Math.random() > 0.5) {
          const jobTitle = potentialJob ? potentialJob.title : 'Senior React Developer';
          const company = potentialJob ? potentialJob.company : 'TechCorp';

          // If it's a "fake" random job, we won't actually apply to it in this sophisticated logic 
          // unless we mock it into existence, but for the requirement, let's focus on Recruiter jobs.

          if (potentialJob) {
            setTimeout(() => {
              addLog(EventCategory.JOB_DETECTION, `New matched job detected: '${jobTitle}' at ${company}`);
              setCurrentJob(potentialJob);
              setAgentState(AgentState.APPLYING); // Transition to applying
            }, 500);
          } else {
            // Random event for demo
            const fakeJob = {
              id: 'fake-' + Date.now(),
              title: jobTitle,
              company: company,
              description: 'AI detected a matching role through external job feeds.',
              skills: userData.skills,
              location: 'Remote',
              applicants: []
            };
            setTimeout(() => {
              addLog(EventCategory.JOB_DETECTION, `New matching job detected: '${jobTitle}' at ${company}`);
              setCurrentJob(fakeJob);
              setAgentState(AgentState.APPLYING); // Transition to applying
            }, 500);
          }
        }
      }, 2000); // Polling frequency reduced to 2s
    } else if (agentState === AgentState.APPLYING && currentJob) {
      // Simulate Application Process
      const runApplicationFlow = async () => {
        const suitScore = calculateSuitability(userData.skills, currentJob.skills);

        await new Promise(r => setTimeout(r, 800));
        addLog(EventCategory.JOB_EVALUATION, `Evaluating job relevance... Match Score: ${suitScore}%`);

        await new Promise(r => setTimeout(r, 800));
        addLog(EventCategory.DOCUMENT_GENERATION, "Optimizing resume...");

        await new Promise(r => setTimeout(r, 800));
        addLog(EventCategory.AUTOMATION_EXECUTION, "Opening application page...");

        await new Promise(r => setTimeout(r, 800));
        addLog(EventCategory.AUTOMATION_EXECUTION, "Filling application form...");

        await new Promise(r => setTimeout(r, 800));
        addLog(EventCategory.AUTOMATION_EXECUTION, "Application submitted successfully.");

        // PERSIST DATA
        const applicationData = {
          jobId: currentJob.id,
          jobTitle: currentJob.title,
          company: currentJob.company,
          description: currentJob.description,
          requiredSkills: currentJob.skills,
          location: currentJob.location,
          status: 'Applied',
          timestamp: new Date().toLocaleTimeString(),
          suitability: suitScore
        };

        setUserData(prev => ({
          ...prev,
          appliedJobs: [...prev.appliedJobs, applicationData]
        }));

        // Update Job Feed with applicant info if it's a real job
        setJobFeed(prevFeed => prevFeed.map(j => {
          if (j.id === currentJob.id) {
            return {
              ...j,
              applicants: [...(j.applicants || []), {
                id: Date.now(),
                name: "Current User",
                email: user?.email || "applicant@example.com",
                skills: userData.skills,
                suitability: suitScore,
                resumeUrl: userData.resume?.resumeUrl,
                originalResumeUrl: userData.resume?.originalResumeUrl,
                status: 'Applied'
              }]
            };
          }
          return j;
        }));

        setAgentState(AgentState.COMPLETED);
      };

      runApplicationFlow();
    }

    return () => clearTimeout(timeoutId);
  }, [agentState, addLog, jobFeed, userData.appliedJobs]);


  const updatePreferences = (prefs) => {
    setUserData(prev => ({ ...prev, preferences: prefs }));
  };

  const uploadResume = (file, parsedData) => {
    // Extract skills (Mocking extraction if not present)
    const extractedSkills = parsedData.skills || [];
    setUserData(prev => ({
      ...prev,
      resume: {
        ...parsedData,
        originalResumeUrl: parsedData.originalResumeUrl // Ensure original URL is stored
      },
      skills: extractedSkills
    }));
  };

  const activateAgent = () => {
    addLog(EventCategory.AGENT_STATE_CHANGE, "Agent activated by user");
    setAgentState(AgentState.MONITORING);
  };

  const pauseAgent = () => {
    if (agentState === AgentState.MONITORING) {
      setAgentState(AgentState.PAUSED);
      addLog(EventCategory.AGENT_STATE_CHANGE, "Agent paused by user");
    } else if (agentState === AgentState.PAUSED) {
      setAgentState(AgentState.MONITORING);
      addLog(EventCategory.AGENT_STATE_CHANGE, "Agent resumed by user");
    }
  };

  const resetSimulation = () => {
    setCurrentJob(null);
    setAgentState(AgentState.MONITORING);
  };

  // Advanced: Suitability Score (Fuzzy Matching)
  const calculateSuitability = (applicantSkills, jobRequiredSkills) => {
    if (!jobRequiredSkills || jobRequiredSkills.length === 0) return 0;
    if (!applicantSkills || applicantSkills.length === 0) return 0;

    const normalize = s => s.toLowerCase().trim();
    const normalizedApplicant = applicantSkills.map(normalize);
    const normalizedJob = jobRequiredSkills.map(normalize);

    let matchCount = 0;
    normalizedJob.forEach(requiredSkill => {
      // Fuzzy match: check if required skill is contained in any applicant skill or vice versa
      const isMatch = normalizedApplicant.some(userSkill =>
        userSkill.includes(requiredSkill) || requiredSkill.includes(userSkill)
      );
      if (isMatch) matchCount++;
    });

    return Math.round((matchCount / normalizedJob.length) * 100);
  };

  // Advanced: Apply to Job
  const applyToJob = (job) => {
    // 1. Check duplication
    if (userData.appliedJobs.some(app => app.jobId === job.id)) {
      addLog(EventCategory.ERROR, `Already applied to ${job.title}`, 'WARNING');
      return;
    }

    // 2. Calculate match
    const suitScore = calculateSuitability(userData.skills, job.skills);

    if (suitScore < 60) {
      addLog(EventCategory.JOB_EVALUATION, `Skipping ${job.title}: Match score ${suitScore}% < 60%`);
      return;
    }

    // 3. Customize Resume (Mock)
    addLog(EventCategory.DOCUMENT_GENERATION, `Customizing resume for ${job.company}...`);

    // 4. Submit
    addLog(EventCategory.AUTOMATION_EXECUTION, `Submitting application to ${job.company} (Match: ${suitScore}%)`);
    setTimeout(() => {
      addLog(EventCategory.AUTOMATION_EXECUTION, `Application submitted to ${job.company}`);
    }, 1000);

    const applicationData = {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      description: job.description,
      requiredSkills: job.skills,
      location: job.location,
      status: 'Applied',
      timestamp: new Date().toLocaleTimeString(),
      suitability: suitScore
    };

    // Update User Data
    setUserData(prev => ({
      ...prev,
      appliedJobs: [...prev.appliedJobs, applicationData]
    }));

    // Update Recruiter Job Feed (Add Applicant)
    setJobFeed(prevFeed => prevFeed.map(j => {
      if (j.id === job.id) {
        return {
          ...j,
          applicants: [...(j.applicants || []), {
            id: Date.now(),
            name: "Current User", // Mock name
            email: user?.email || "applicant@example.com",
            skills: userData.skills,
            suitability: suitScore,
            resumeUrl: userData.resume?.resumeUrl,
            originalResumeUrl: userData.resume?.originalResumeUrl,
            status: 'Applied'
          }]
        };
      }
      return j;
    }));
  };

  const login = (email, role) => {
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
    setAgentState(AgentState.NOT_INITIALIZED);
  };

  const postJob = (job) => {
    // Add ID and empty applicants
    const newJob = { ...job, id: Date.now(), applicants: [] };
    setJobFeed(prev => [...prev, newJob]);
  };

  const deleteJob = (jobId) => {
    setJobFeed(prev => prev.filter(job => job.id !== jobId));
  };

  const deleteApplication = (jobId) => {
    setUserData(prev => ({
      ...prev,
      appliedJobs: prev.appliedJobs.filter(app => app.jobId !== jobId)
    }));
  };

  return (
    <AppContext.Provider value={{
      agentState,
      setAgentState,
      logs,
      addLog,
      userData,
      updatePreferences,
      uploadResume,
      activateAgent,
      pauseAgent,
      resetSimulation,
      user,
      login,
      logout,
      jobFeed,
      postJob,
      deleteJob,
      deleteApplication,
      applyToJob,
      calculateSuitability
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
