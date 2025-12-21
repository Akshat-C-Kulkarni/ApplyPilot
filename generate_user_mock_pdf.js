
import { jsPDF } from "jspdf";
import fs from "fs";

// Create a new PDF document, matching user's layout roughly
const doc = new jsPDF();

// Left content
doc.setFontSize(22);
doc.text("First Last", 20, 20);

doc.setFontSize(16);
doc.text("Front End Developer", 20, 30);

doc.setFontSize(14);
doc.text("WORK EXPERIENCE", 20, 45);

doc.setFontSize(12);
doc.text("Resume Worded, London, UK", 20, 55);
doc.text("Front End Developer (08/2021 - Present)", 20, 60);
doc.text(" - Developed an interactive map for a real estate company.", 20, 65);
doc.text(" - Conducted routine updates, security patches.", 20, 70);

// Right content (Skills block)
doc.text("SKILLS", 140, 55);
doc.setFontSize(10);
doc.text("Hard Skills:", 140, 65);
doc.text(" - Debugging", 140, 70);
doc.text(" - Testing", 140, 75);
doc.text(" - CSS Preprocessing", 140, 80);

doc.text("Techniques:", 140, 95);
doc.text(" - Web Development", 140, 100);
doc.text(" - Agile Methodologies", 140, 105);

doc.text("Tools and Software:", 140, 120);
doc.text(" - TypeScript", 140, 125);
doc.text(" - Vue.js", 140, 130);
doc.text(" - jQuery", 140, 135);

// Save the PDF
const pdfOutput = doc.output();
fs.writeFileSync("user_mock_resume.pdf", pdfOutput);

console.log("PDF created successfully: user_mock_resume.pdf");
