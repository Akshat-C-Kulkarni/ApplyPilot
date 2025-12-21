
export const extractSection = (text, sectionName) => {
    // Convert to lower case for case-insensitive matching, but keep original for extraction
    const lowerText = text.toLowerCase();
    const map = {
        'education': ['education', 'academic background', 'qualifications', 'university'],
        'experience': ['experience', 'work history', 'employment', 'professional experience', 'work experience', 'history'],
        'skills': ['skills', 'technical skills', 'technologies', 'core competencies', 'hard skills', 'techniques', 'tools and software']
    };

    const keywords = map[sectionName.toLowerCase()];
    if (!keywords) return '';

    // Find the start index
    let startIndex = -1;
    for (const keyword of keywords) {
        const idx = lowerText.indexOf(keyword);
        if (idx !== -1) {
            startIndex = idx;
            break;
        }
    }

    if (startIndex === -1) return '';

    // Find the next section start to know where to stop
    // Common section headers
    const allHeaders = ['education', 'experience', 'skills', 'projects', 'summary', 'languages', 'certifications', 'interests'];
    let endIndex = text.length;

    // Look for the nearest next header
    for (const header of allHeaders) {
        // Don't match the current section header or headers before it
        const idx = lowerText.indexOf(header, startIndex + 20); // +20 to skip the current header title
        if (idx !== -1 && idx < endIndex) {
            endIndex = idx;
        }
    }

    // Extract and clean
    let content = text.substring(startIndex, endIndex).trim();

    // Split into lines
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // If the first line is just the header (approximate), remove it
    if (lines.length > 0) {
        const firstLine = lines[0].toLowerCase();
        // Check if first line contains one of the keywords significantly
        if (keywords.some(k => firstLine.includes(k))) {
            lines.shift();
        }
    }

    content = lines.join('\n');

    return content.trim() || null;
};
