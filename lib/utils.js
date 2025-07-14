import { clsx } from 'clsx';
import { jsPDF } from 'jspdf';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function generatePDF(element, filename) {
  const html2canvas = (await import('html2canvas')).default;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdfDoc = new jsPDF(); 
  const imgWidth = 210; 
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdfDoc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdfDoc.addPage();
    pdfDoc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdfDoc.save(filename);
}
