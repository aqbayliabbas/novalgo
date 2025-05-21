// To ensure the full report is captured in the PDF, make sure:
// 1. The elementId passed here wraps the ENTIRE report (not just a visible or scrollable part).
// 2. The report container does NOT have CSS like 'overflow: hidden' or a fixed height during export.
// 3. For multi-page reports, you can add <div class="pdf-page-break"></div> in your HTML/JSX where you want page breaks, and add this CSS globally:
//    .pdf-page-break { page-break-before: always; }
//
// Optionally, temporarily remove max-height/overflow styles before export and restore them after.

import { jsPDF } from 'jspdf';

// Copie locale des labels si non exportés
const PROJECT_INFO_LABELS: Record<string, string> = {
  projectName: 'Nom du Projet',
  buildingType: 'Type de Bâtiment',
  wilaya: 'Wilaya',
  daira: 'Daïra',
  commune: 'Commune',
  climateZone: 'Zone Climatique',
  surfaceArea: 'Surface (m²)',
  numFloors: 'Nombre d\'Étages',
  constructionYear: 'Année de Construction/Rénovation',
  projectStage: 'Phase du Projet',
};

// Libellés d'évaluation pour PDF (copie de EVAL_LABELS)
const EVAL_LABELS = {
  materials: {
    label: 'Matériaux',
    local: {
      label: 'Matériaux Locaux',
      geographic: 'Origine géographique (< 300 km)',
      percentage: 'Pourcentage utilisé',
      economy: 'Contribution économie locale',
    },
    lowImpact: {
      label: 'Matériaux à Faible Impact',
      lifecycle: 'Analyse du cycle de vie',
      biosourced: 'Biosourcé',
      local: 'Matériaux locaux',
      lowVOC: 'Faibles émissions COV',
    },
    waste: {
      label: 'Gestion des Déchets',
      wastePlan: 'Plan de gestion',
      valorization: 'Valorisation >50%',
      sourceSorting: 'Tri à la source',
    },
  },
  energy: {
    label: 'Énergie',
    renewable: {
      label: 'Énergies Renouvelables',
      photovoltaic: 'Photovoltaïque',
      wind: 'Éolien',
      thermal: 'Solaire thermique',
    },
    insulation: {
      label: 'Isolation',
      materials: 'Matériaux',
      walls: 'Murs',
      roof: 'Toiture',
      windows: 'Fenêtres',
    },
    orientation: {
      label: 'Orientation',
      facades: 'Façades',
      localContext: 'Contexte local',
      passiveSolar: 'Solaire passif',
    },
    ventilation: {
      label: 'Ventilation',
      cross: 'Traversante',
      wind: 'Par le vent',
      nocturnal: 'Nocturne',
    },
  },
  water: {
    label: 'Eau',
    consumption: {
      label: 'Consommation',
      flow: 'Débit',
      devices: 'Appareils',
      awareness: 'Sensibilisation',
    },
    rainwater: {
      label: 'Eaux Pluviales',
      surface: 'Surface',
      storage: 'Stockage',
      filtration: 'Filtration',
    },
    wastewater: {
      label: 'Eaux Usées',
      pretreatment: 'Prétraitement',
      separation: 'Séparation',
      reuse: 'Réutilisation',
    },
  },
  comfort: {
    label: 'Confort',
    thermal: {
      label: 'Thermique',
      temperature: 'Température',
      bioclimatic: 'Bioclimatique',
      solarProtection: 'Protection solaire',
    },
    acoustic: {
      label: 'Acoustique',
      insulation: 'Isolation',
      windows: 'Fenêtres',
      noise: 'Bruit',
    },
    visual: {
      label: 'Visuel',
      naturalLight: 'Lumière naturelle',
      uniform: 'Uniformité',
      depth: 'Profondeur',
    },
  },
  waste: {
    label: 'Déchets',
    construction: {
      label: 'Déchets de Construction',
      triZone: 'Zone de tri',
      awareness: 'Sensibilisation',
      control: 'Contrôle',
    },
    operation: {
      label: 'Déchets en Exploitation',
      bins: 'Bacs',
      wasteRoom: 'Local déchets',
      signage: 'Signalétique',
    },
  },
  economy: {
    label: 'Économie',
    cost: {
      label: 'Coût',
      initial: 'Initial',
      maintenance: 'Maintenance',
      flexibility: 'Flexibilité',
      qualityPrice: 'Qualité/prix',
    },
    solutions: {
      label: 'Solutions',
      simpleSystems: 'Systèmes simples',
      multifunctional: 'Multifonctionnel',
      localLabor: 'Main d\'œuvre locale',
    },
  },
  biodiversity: {
    label: 'Biodiversité',
    vegetation: {
      label: 'Végétation',
      preservation: 'Préservation des arbres',
      protection: 'Protection pendant construction',
      integration: 'Intégration paysagère',
    },
    biodiversity: {
      label: 'Biodiversité',
      inventory: 'Inventaire',
      corridors: 'Corridors écologiques',
      nuisance: 'Réduction nuisances',
    },
    site: {
      label: 'Site',
      relief: 'Respect relief',
      materials: 'Matériaux harmonieux',
      topography: 'Topographie',
    },
  },
  safety: {
    label: 'Sécurité',
    fire: {
      label: 'Incendie',
      detection: 'Détection',
      means: 'Moyens',
      materials: 'Matériaux résistants',
      evacuation: 'Plan évacuation',
    },
    accessibility: {
      label: 'Accessibilité',
      pathways: 'Cheminements',
      access: 'Accès services',
      signage: 'Signalétique',
      internal: 'Sécurité interne',
    },
  },
};

export async function downloadFormAndEvalAsPDF(
  projectInfo: any,
  evaluation: any,
  scoreResult: any,
  filename: string = 'rapport_novalgo_design.pdf'
) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const marginLeft = 15;
  const marginTop = 15;
  const fontSize = 8;
  const headerFontSize = 13;
  const sectionSpacing = 6;
  const lineHeight = 6;
  const maxWidth = 180;
  let y = marginTop;

  // --- Background ---
  doc.setFillColor(247, 250, 255);
  doc.rect(0, 0, 210, 297, 'F'); // whole page

  // --- Logo at the top center (async, image only) ---
  let logoWidth = 40; // mm
  let logoHeight = 0; // will be calculated based on aspect ratio
  let logoY = y;
  let logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2;
  // Helper to load image and return base64
  async function loadImageAsBase64(url: string): Promise<{base64: string, width: number, height: number}> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/png');
        resolve({ base64, width: img.width, height: img.height });
      };
      img.onerror = function () { reject(new Error('Logo image load failed')); };
      img.src = url;
    });
  }
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const { base64, width, height } = await loadImageAsBase64('/logo.PNG');
      logoHeight = (height / width) * logoWidth;
      doc.addImage(base64, 'PNG', logoX, logoY, logoWidth, logoHeight);
    } catch {
      // If logo fails to load, just skip
      logoHeight = 18;
    }
  }
  y += logoHeight + 8;

  // --- Certification label (moved to bottom center) ---
  let isCertified = false;
  let labelText = 'Projet NON CERTIFIÉ';
  let labelColor = [220, 38, 38]; // Red
  if (
    scoreResult && (
      scoreResult.totalScore > 60 ||
      scoreResult.certified === true ||
      scoreResult.performanceLevel === 'Certifié'
    )
  ) {
    isCertified = true;
    labelText = 'Projet CERTIFIÉ';
    labelColor = [34, 197, 94]; // Green
  }
  // Draw the certification label just under the result section, centered
  const labelWidth = 80;
  const labelHeight = 14;
  const labelX = (doc.internal.pageSize.getWidth() - labelWidth) / 2;
  const labelY = y + 8; // 8mm below the last result line
  doc.setFillColor(...labelColor);
  doc.roundedRect(labelX, labelY, labelWidth, labelHeight, 4, 4, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255,255,255);
  doc.setFont(undefined, 'bold');
  doc.text(labelText, doc.internal.pageSize.getWidth()/2, labelY + labelHeight/2 + 4, { align: 'center' });
  doc.setFont(undefined, 'normal');
  y = labelY + labelHeight + 4;

  // --- Report Date ---
  const reportDate = '20/05/2025'; // Local time as provided
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.setFont(undefined, 'normal');
  doc.text(`Rapport généré le ${reportDate}`, doc.internal.pageSize.getWidth()/2, y + 6, { align: 'center' });
  y += 12;

  // --- Project Info Section ---
  doc.setFillColor(127, 90, 240); // purple
  doc.roundedRect(marginLeft - 3, y - 4, maxWidth + 6, 10, 2, 2, 'F');
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(headerFontSize);
  doc.text('Informations du Projet', marginLeft, y + 3);
  y += sectionSpacing + 7;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor(60, 40, 120);
  doc.setDrawColor(220, 220, 240);
  doc.setLineWidth(0.1);
  // Info box
  doc.setFillColor(255,255,255);
  doc.roundedRect(marginLeft-2, y-2, maxWidth+4, Object.keys(projectInfo||{}).length*lineHeight+6, 3, 3, 'F');
  y += 4;
  for (const [key, value] of Object.entries(projectInfo || {})) {
    const label = (PROJECT_INFO_LABELS as any)[key] || key;
    doc.text(`${label}:`, marginLeft, y, { maxWidth });
    doc.setFont(undefined, 'bold');
    doc.text(`${value ?? ''}`, marginLeft+60, y, { maxWidth });
    doc.setFont(undefined, 'normal');
    y += lineHeight;
    if (y > 297 - marginTop - 30) { doc.addPage(); y = marginTop; }
  }
  y += sectionSpacing;


  // --- Score Result Section ---
  doc.setFillColor(127, 90, 240); // purple
  doc.roundedRect(marginLeft - 3, y - 4, maxWidth + 6, 10, 2, 2, 'F');
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255,255,255);
  doc.setFontSize(headerFontSize);
  doc.text('Résultat', marginLeft, y + 3);
  y += sectionSpacing + 7;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor(60, 40, 120);
  if (scoreResult) {
    doc.setFont(undefined, 'bold');
    doc.text(`Score total:`, marginLeft, y, { maxWidth });
    doc.setFont(undefined, 'normal');
    doc.text(`${scoreResult.totalScore ?? ''}`, marginLeft+60, y, { maxWidth });
    y += lineHeight;
    doc.setFont(undefined, 'bold');
    doc.text(`Niveau de performance:`, marginLeft, y, { maxWidth });
    doc.setFont(undefined, 'normal');
    doc.text(`${scoreResult.performanceLevel ?? ''}`, marginLeft+60, y, { maxWidth });
    y += lineHeight;
  }

  doc.save(filename);
}

export async function downloadPreviewAsPDF(elementId: string) {
  let html2pdf;
  if (typeof window !== 'undefined' && (window as any).html2pdf) {
    html2pdf = (window as any).html2pdf;
  } else {
    html2pdf = (await import('html2pdf.js')).default;
  }
  const input = document.getElementById(elementId);
  if (!input) return;

  // Remove overflow/max-height for export
  const originalOverflow = input.style.overflow;
  const originalMaxHeight = input.style.maxHeight;
  input.style.overflow = 'visible';
  input.style.maxHeight = 'none';

  // Wait a tick to ensure layout is updated (for async content)
  await new Promise(res => setTimeout(res, 100));

  // To force the report to fit on a single PDF page:
  // 1. Set a very tall custom page height for jsPDF (e.g., 2000mm) so all content fits.
  // 2. Disable pagebreaks by not setting the pagebreak option, or setting it to [] or 'none'.
  // 3. Optionally, adjust scale to shrink content to fit.
  // Note: If the content is extremely long, text may become very small.
  await html2pdf()
    .set({
      margin:       0.2,
      filename:     'rapport_novalgo.pdf',
      image:        { type: 'pdf', quality: 0.98 },
      html2canvas:  { scale: 1.1, useCORS: true },
      jsPDF:        { unit: 'mm', format: [210, 2000], orientation: 'portrait' }, // 210mm wide (A4), 2000mm tall
      // pagebreak:    { mode: [] } // disables pagebreaks
    })
    .from(input)
    .save();

  // Restore styles
  input.style.overflow = originalOverflow;
  input.style.maxHeight = originalMaxHeight;
}

