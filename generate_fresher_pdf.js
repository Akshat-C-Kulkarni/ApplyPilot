
import { jsPDF } from "jspdf";
import fs from "fs";

// Create a new PDF document, Fresher version
const doc = new jsPDF();

// Add some content
doc.setFontSize(22);
doc.text("Jane Fresher", 20, 20);

doc.setFontSize(16);
doc.text("Aspiring Developer", 20, 30);

doc.setFontSize(12);
doc.text("Education", 20, 50);
doc.text(" - Univ of Tech, 2024", 20, 60);

doc.text("Skills", 20, 80);
doc.text(" - Java, Python", 20, 90);

// Save the PDF
const pdfOutput = doc.output();
fs.writeFileSync("test_resume_fresher.pdf", pdfOutput);

console.log("PDF created successfully: test_resume_fresher.pdf");
