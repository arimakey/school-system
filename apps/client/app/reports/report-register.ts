import { jsPDF } from "jspdf";
import { Register } from "~/interfaces/registers.interface";

export const generateRegisterPDF = (register: Register) => {
  const doc = new jsPDF({ format: "a4" });

  // Dimensiones y márgenes
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 20;
  const marginRight = 20;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let currentY = 20;

  const primaryColor = "#333333";
  const secondaryColor = "#555555";
  const lineColor = "#CCCCCC";

  doc.setFont("helvetica", "normal");

  // Título: nombre completo del estudiante
  const studentFullName = `${register.student.name} ${register.student.last_name}`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text(studentFullName, pageWidth / 2, currentY, { align: "center" });
  currentY += 8;

  // Subtítulo: "Reporte de Registro"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(secondaryColor);
  doc.text("Reporte de Registro", pageWidth / 2, currentY, { align: "center" });
  currentY += 10;

  // Línea divisoria
  doc.setDrawColor(lineColor);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, currentY, pageWidth - marginRight, currentY);
  currentY += 10;

  // Agregar la imagen del estudiante si existe
  if (register.student.image) {
    try {
      const imgWidth = 50; // Ancho de la imagen
      const imgHeight = 50; // Alto de la imagen
      const imgX = (pageWidth - imgWidth) / 2; // Centrar horizontalmente
      const imgY = currentY; // Posición vertical de la imagen

      // Nota: Asegúrate de que la imagen sea una URL válida con formato compatible (e.g., base64, URL absoluta de imagen pública)
      doc.addImage(register.student.image, "JPEG", imgX, imgY, imgWidth, imgHeight);
      currentY += imgHeight + 10; // Ajustar el cursor vertical
    } catch (error) {
      console.error("Error al agregar la imagen:", error);
      currentY += 10;
    }
  }

  // Función para dibujar el título de una sección
  const drawSectionTitle = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);
    doc.text(title, marginLeft, currentY);
    currentY += 6;
    doc.setDrawColor(lineColor);
    doc.setLineWidth(0.3);
    doc.line(marginLeft, currentY, pageWidth - marginRight, currentY);
    currentY += 8;
  };

  // Función auxiliar para dibujar un campo con etiqueta y valor
  const drawField = (label: string, value: string | number | null | undefined) => {
    const labelText = `${label}:`;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(primaryColor);

    const labelWidth = doc.getTextWidth(labelText);
    doc.text(labelText, marginLeft, currentY);

    const xValuePos = marginLeft + labelWidth + 4;
    const maxValueWidth = contentWidth - labelWidth - 10;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(secondaryColor);

    const valStr = value == null || value === "" ? "N/A" : value.toString();
    const wrappedText = doc.splitTextToSize(valStr, maxValueWidth);

    if (wrappedText.length > 0) {
      doc.text(wrappedText[0], xValuePos, currentY);
    }

    for (let i = 1; i < wrappedText.length; i++) {
      currentY += 5;
      doc.text(wrappedText[i], marginLeft, currentY);
    }

    currentY += 6;
  };

  // Sección: Información del Estudiante
  drawSectionTitle("Información del Estudiante");
  drawField("Código", register.student.code);
  drawField("Nombre Completo", studentFullName);
  drawField("DNI", register.student.dni);
  drawField("Correo", register.student.email);
  drawField("Fecha de Nacimiento", new Date(register.student.birthdate).toLocaleDateString());
  if (register.student.address) drawField("Dirección", register.student.address);
  if (register.student.phoneNumber) drawField("Teléfono", register.student.phoneNumber);

  // Sección: Información del Apoderado
  drawSectionTitle("Información del Apoderado");
  drawField("DNI", register.guardian.dni);
  drawField("Nombre Completo", `${register.guardian.name} ${register.guardian.last_name}`);
  drawField("Correo", register.guardian.email);
  drawField("Teléfono", register.guardian.phoneNumber);
  if (register.guardian.address) drawField("Dirección", register.guardian.address);
  if (register.guardian.occupation) drawField("Ocupación", register.guardian.occupation);
  drawField("Activo", register.guardian.isActive ? "Sí" : "No");

  // Sección: Información de la Sección
  drawSectionTitle("Información de la Sección");
  drawField("Nombre", register.classroom.name);
  drawField("Capacidad", register.classroom.capacity);

  // Sección: Información del Proceso de Matrícula
  drawSectionTitle("Información del Proceso de Matrícula");
  drawField("Nombre", register.registrationProcess.name);
  drawField("Estado", register.registrationProcess.status ? "Activo" : "Inactivo");
  drawField(
    "Fechas",
    `${new Date(register.registrationProcess.startDate).toLocaleDateString()} - ${new Date(
      register.registrationProcess.endDate
    ).toLocaleDateString()}`
  );

  // Pie de página
  const addFooter = () => {
    const footerY = pageHeight - 15;
    doc.setDrawColor(lineColor);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, footerY - 5, pageWidth - marginRight, footerY - 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(secondaryColor);
    doc.text(`Generado: ${new Date().toLocaleDateString()}`, marginLeft, footerY);
  };
  addFooter();

  doc.save(`reporte_registro_${register.student.code}.pdf`);
};
