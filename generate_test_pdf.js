
import { jsPDF } from "jspdf";
import fs from "fs";

// Create a new PDF document
const doc = new jsPDF();

// Add some content
doc.setFontSize(22);
doc.text("John Doe", 20, 20);

doc.setFontSize(16);
doc.text("Senior Frontend Engineer", 20, 30);

doc.setFontSize(12);
doc.text("Experience", 20, 50);
doc.text(" - Built a React application for monitoring agents.", 20, 60);
doc.text(" - Optimized PDF generation using jsPDF.", 20, 70);

doc.text("Skills", 20, 90);
doc.text(" - JavaScript, HTML, CSS", 20, 100);
doc.text(" - React, Node.js, Express", 20, 110);
doc.text(" - Git, Docker, AWS", 20, 120);

// Save the PDF
const pdfOutput = doc.output();
fs.writeFileSync("test_resume.pdf", pdfOutput);

console.log("PDF created successfully: test_resume.pdf");
