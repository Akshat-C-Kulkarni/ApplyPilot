
// Enhanced keywords
const SKILL_KEYWORDS = [
    // Languages
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby", "HTML", "CSS", "SQL", "NoSQL", "Bash", "Shell",
    // Frameworks & Libraries
    "React", "Angular", "Vue", "Next.js", "Nuxt.js", "Node.js", "Express", "NestJS", "Django", "Flask", "FastAPI", "Spring Boot", "Laravel", "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Pandas", "NumPy", "JQuery", "Bootstrap", "Tailwind",
    // AI/ML
    "Agentic AI", "AI Engineer", "Machine Learning", "Deep Learning", "NLP", "LLM", "Generative AI", "Computer Vision",
    // Tools & DevOps
    "Git", "GitHub", "GitLab", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "GCP", "Jenkins", "CircleCI", "Terraform", "Ansible", "Jira",
    // Databases
    "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Cassandra", "DynamoDB",
    // Concepts/Other
    "REST API", "GraphQL", "Microservices", "Serverless", "Agile", "Scrum", "Frontend", "Backend", "Full Stack", "Debugging", "Testing"
];

export const extractSkillsFromText = (text, skillsSectionText = null) => {
    const foundSkills = new Set();

    // 1. If a specific skills section is provided, try to parse it STRICTLY
    if (skillsSectionText) {
        // Splitting by common delimiters (newline, comma, bullets, colons, dots)
        const potentialSkills = skillsSectionText.split(/[\n,•·\-:;|]/).map(s => s.trim()).filter(s => s.length > 2);

        const ignoredHeaders = [
            'skills', 'technologies', 'tools', 'languages', 'hard skills',
            'techniques', 'tools and software', 'core competencies',
            'contact', 'education', 'experience'
        ];

        potentialSkills.forEach(s => {
            const lowerS = s.toLowerCase();
            // Basic validity check: shorter than 35 chars, not just numbers, not a header
            if (s.length < 35 && !/^\d+$/.test(s) && !ignoredHeaders.some(h => lowerS === h)) {
                foundSkills.add(s);
            }
        });

        // Use strict regex matching ONLY on the SECTION text to catch known keywords that might be messy
        SKILL_KEYWORDS.forEach(skill => {
            const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
            if (regex.test(skillsSectionText)) {
                foundSkills.add(skill);
            }
        });

        // USER REQUEST: If we found a section, ONLY use what's in there.
        // Return only what we found in this section to stop noise from full text.
        if (foundSkills.size > 0) {
            return Array.from(foundSkills);
        }
    }

    // 2. Fallback: Scan full text ONLY if no section was found
    SKILL_KEYWORDS.forEach(skill => {
        const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
        if (regex.test(text)) {
            foundSkills.add(skill);
        }
    });

    return Array.from(foundSkills);
};
