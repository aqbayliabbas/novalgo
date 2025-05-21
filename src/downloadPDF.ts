import jsPDF from 'jspdf';

export function downloadPDF(projectInfo: any, evaluation: any) {
  const doc = new jsPDF();
  let y = 15;
  doc.setFont('helvetica', '');
  doc.setFontSize(16);
  doc.text('Rapport NOVALGO', 105, y, { align: 'center' });

  y += 12;
  doc.setFontSize(12);
  doc.text('Informations du projet', 15, y);
  y += 7;
  doc.setLineWidth(0.2);
  doc.line(15, y, 195, y);
  y += 6;

  Object.entries(projectInfo).forEach(([key, value]) => {
    doc.text(`${capitalizeFr(key)} : ${value ?? '-'}`, 18, y);
    y += 7;
  });

  y += 6;
  doc.setFontSize(12);
  doc.text('Évaluation (champs sélectionnés uniquement)', 15, y);
  y += 7;
  doc.line(15, y, 195, y);
  y += 6;

  Object.entries(evaluation).forEach(([category, subcats]) => {
    let categoryHasChecked = false;
    // Check if any field in this category is checked
    if (typeof subcats === 'object' && subcats !== null) {
      Object.entries(subcats).forEach(([subcategory, fields]) => {
        if (typeof fields === 'object' && fields !== null) {
          Object.entries(fields).forEach(([field, checked]) => {
            if (checked) categoryHasChecked = true;
          });
        }
      });
    }
    if (categoryHasChecked) {
      doc.setFontSize(11);
      doc.text(capitalizeFr(category), 18, y);
      y += 6;
      Object.entries(subcats).forEach(([subcategory, fields]) => {
        if (typeof fields === 'object' && fields !== null) {
          let subcatHasChecked = false;
          Object.entries(fields).forEach(([field, checked]) => {
            if (checked) subcatHasChecked = true;
          });
          if (subcatHasChecked) {
            doc.setFontSize(10);
            doc.text('  ' + capitalizeFr(subcategory) + ' :', 22, y);
            y += 5;
            Object.entries(fields).forEach(([field, checked]) => {
              if (checked) {
                doc.setFontSize(10);
                doc.text('    - ' + capitalizeFr(field), 26, y);
                y += 5;
                if (y > 280) {
                  doc.addPage();
                  y = 15;
                }
              }
            });
          }
        }
      });
      y += 2;
    }
  });

  doc.save('rapport_novalgo.pdf');
}

// Capitalize and prettify field names for French
function capitalizeFr(str: string) {
  // Replace camelCase with spaces, capitalize first letter, and use French field name mapping where possible
  const map: Record<string, string> = {
    projectName: 'Nom du projet',
    buildingType: 'Type de bâtiment',
    wilaya: 'Wilaya',
    daira: 'Daïra',
    commune: 'Commune',
    climateZone: 'Zone climatique',
    surfaceArea: 'Surface',
    numFloors: 'Nombre d’étages',
    constructionYear: 'Année de construction',
    projectStage: 'Étape du projet',
    // client: 'Client',
    // architect: 'Architecte',
    // Add more mappings as needed
  };
  if (map[str]) return map[str];
  // Fallback: prettify
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
}

