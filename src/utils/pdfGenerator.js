
import { jsPDF } from "jspdf";

export const generatePDFFromText = (text) => {
    const doc = new jsPDF();

    // Split text into lines that fit the page
    const splitText = doc.splitTextToSize(text, 180); // 180mm width (A4 is ~210mm)

    let y = 10; // Start Y position
    const pageHeight = doc.internal.pageSize.height;

    splitText.forEach(line => {
        if (y > pageHeight - 10) {
            doc.addPage();
            y = 10;
        }
        doc.text(line, 10, y);
        y += 7; // Line height
    });

    // Return Blob URL
    const blob = doc.output('blob');
    return URL.createObjectURL(blob);
};
