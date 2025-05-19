import React from 'react';
import { jsPDF } from 'jspdf';

interface ReportPreviewPDFProps {
  projectInfo: any;
  evaluation: any;
}

// Helper to render a pretty PDF-like preview in the browser
interface ReportPreviewPDFProps {
  projectInfo: any;
  evaluation: any;
  scoreResult: any;
}

// Libellés exacts du formulaire
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
  client: 'Client',
  architect: 'Architecte',
};

// Labels exacts pour l'évaluation (catégories, sous-catégories, champs)
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


const ReportPreviewPDF: React.FC<ReportPreviewPDFProps> = ({ projectInfo, evaluation, scoreResult }) => {
  return (
    <div style={{
      maxWidth: 900,
      margin: '40px auto',
      background: 'linear-gradient(135deg, #f7faff 0%, #f1ecfc 100%)',
      borderRadius: 24,
      boxShadow: '0 8px 32px 0 rgba(60, 40, 120, 0.10)',
      padding: 0,
      fontFamily: 'Inter, Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
    }}>
      <div style={{ height: 10, background: 'linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%)' }} />
      <header style={{
        marginBottom: 32,
        padding: '40px 60px 0 60px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 0.5,
          margin: 0,
          color: '#312e81',
          textShadow: '0 2px 8px #e0e7ff55'
        }}>
          Rapport NOVALGO
        </h2>
        {scoreResult && (() => {
          // Import PERFORMANCE_LEVELS at the top of the file if not already
          const PERFORMANCE_LEVELS = [
            { min: 0, max: 45, label: 'Insuffisant', color: '#e11d48', bg: '#fef2f2' },
            { min: 45, max: 65, label: 'Moyen', color: '#eab308', bg: '#fefce8' },
            { min: 65, max: 85, label: 'Bon', color: '#22c55e', bg: '#f0fdf4' },
            { min: 85, max: 100, label: 'Excellent', color: '#14b8a6', bg: '#ecfdf5' },
          ];
          const level = PERFORMANCE_LEVELS.find(l => scoreResult.totalScore >= l.min && scoreResult.totalScore < l.max || (l.max === 100 && scoreResult.totalScore === 100)) || PERFORMANCE_LEVELS[0];
          return (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              marginTop: 14,
              fontSize: 17,
              fontWeight: 600,
            }}>
              <div style={{
                background: level.bg,
                color: level.color,
                borderRadius: 12,
                padding: '14px 36px',
                fontWeight: 700,
                minWidth: 160,
                textAlign: 'center',
                fontSize: 20,
                boxShadow: '0 2px 8px ' + level.bg,
                border: '1.5px solid ' + level.color,
                letterSpacing: 0.2,
              }}>
                <div style={{ fontSize: 17, fontWeight: 700, opacity: 0.85 }}>Score total :</div>
                <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>{scoreResult.totalScore}</div>
              </div>
              <div style={{
                background: level.bg,
                color: level.color,
                borderRadius: 12,
                padding: '14px 36px',
                fontWeight: 700,
                minWidth: 220,
                textAlign: 'center',
                fontSize: 20,
                boxShadow: '0 2px 8px ' + level.bg,
                border: '1.5px solid ' + level.color,
                letterSpacing: 0.2,
              }}>
                <div style={{ fontSize: 17, fontWeight: 700, opacity: 0.85 }}>Niveau de performance :</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{scoreResult.performanceLevel}</div>
              </div>
            </div>
          );
        })()}

      </header>
      <div style={{ borderBottom: '1px solid #e5e5e5', margin: '18px 0 22px 0' }} />
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px 0 rgba(60, 40, 120, 0.08)',
        margin: '40px',
        padding: '40px 48px 32px 48px',
      }}>
        <section style={{ marginBottom: 28 }}>
          <h3 style={{
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 14,
            color: '#7f5af0',
            letterSpacing: 0.15,
            borderLeft: '4px solid #7f5af0',
            paddingLeft: 12,
            background: 'linear-gradient(90deg, #f7faff 60%, #f1ecfc 100%)',
            borderRadius: 6,
            boxShadow: '0 1px 4px #f1ecfc55',
          }}>
            Informations du projet
          </h3>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontSize: 15,
            background: '#fafaff',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 1px 2px #e0e7ff33',
          }}>
            <tbody>
              {Object.entries(projectInfo).map(([key, value], idx) => (
                <tr key={key} style={{ background: idx % 2 === 0 ? '#fff' : '#f7f6fc' }}>
                  <td style={{ padding: '9px 12px', fontWeight: 500, color: '#444', width: 210, border: 'none' }}>{PROJECT_INFO_LABELS[key] || key}</td>
                  <td style={{ padding: '9px 12px', color: '#222', border: 'none' }}>{value !== undefined && value !== null && value !== '' ? String(value) : <span style={{ color: '#bbb', fontStyle: 'italic' }}>-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h3 style={{
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 14,
            color: '#2cb67d',
            letterSpacing: 0.15,
            borderLeft: '4px solid #2cb67d',
            paddingLeft: 12,
            background: 'linear-gradient(90deg, #f7faff 60%, #e9fbf2 100%)',
            borderRadius: 6,
            boxShadow: '0 1px 4px #e9fbf255',
          }}>
            Évaluation du projet
          </h3>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontSize: 15,
            background: '#fafdff',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 1px 2px #e0e7ff33',
          }}>
            <tbody>
              {Object.entries(evaluation).map(([category, subcats]) => (
                <React.Fragment key={category}>
                  <tr>
                    <td colSpan={2} style={{
                      fontWeight: 700,
                      padding: '16px 0 6px 0',
                      color: '#333',
                      background: '#f5f3ff',
                      borderTop: '1px solid #ececec',
                      fontSize: 16,
                      borderRadius: 0,
                    }}>
                      {EVAL_LABELS[category]?.label || category}
                    </td>
                  </tr>
                  {typeof subcats === 'object' && subcats !== null &&
                    Object.entries(subcats).map(([subcategory, fields], idx2) => (
                      <tr
                        key={category + '-' + subcategory}
                        style={{
                          background: idx2 % 2 === 0 ? '#fff' : '#f7f6fc',
                          borderBottom: 'none',
                        }}
                      >
                        <td
                          style={{
                            paddingLeft: 26,
                            fontWeight: 500,
                            width: 210,
                            color: '#555',
                            border: 'none',
                            paddingTop: idx2 === 0 ? 8 : 22,
                            paddingBottom: 12,
                            verticalAlign: 'top',
                          }}
                        >
                          {EVAL_LABELS[category]?.[subcategory]?.label || subcategory}
                        </td>
                        <td
                          style={{
                            border: 'none',
                            paddingTop: idx2 === 0 ? 8 : 22,
                            paddingBottom: 12,
                          }}
                        >
                          {typeof fields === 'object' && fields !== null
                            ? Object.entries(fields).map(([field, checked]) => (
                                <span
                                  key={field}
                                  style={{
                                    marginRight: 12,
                                    fontWeight: checked ? 700 : 400,
                                    color: checked ? '#fff' : '#222',
                                    background: checked ? 'linear-gradient(90deg, #7f5af0 60%, #2cb67d 100%)' : '#ececec',
                                    borderRadius: 16,
                                    padding: '3px 11px',
                                    border: checked ? 'none' : '1px solid #e0e0e0',
                                    display: 'inline-block',
                                    fontSize: 14,
                                    boxShadow: checked ? '0 2px 8px #b7e2c955' : undefined,
                                    transition: 'all 0.2s',
                                  }}
                                >
                                  {checked ? '✔ ' : ''}{EVAL_LABELS[category]?.[subcategory]?.[field] || field}
                                </span>
                              ))
                            : null}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <div style={{ fontSize: 12, color: '#888', marginTop: 30, textAlign: 'right' }}>
        Rapport généré le {new Date().toLocaleDateString('fr-FR')}
      </div>
    </div>
  );
};

// --- Nouveau rendu "carte" pour la preview ---
export const PDFStylePreview: React.FC<ReportPreviewPDFProps> = ({ projectInfo, evaluation, scoreResult }) => (
  <div style={{
    maxWidth: 900,
    margin: '40px auto',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px #e0e7ff33',
    padding: 0,
    fontFamily: 'Inter, Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #ececec',
  }}>
    <header style={{
      marginBottom: 22,
      padding: '32px 40px 0 40px',
      textAlign: 'left',
    }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, color: '#232323', margin: 0, letterSpacing: 0.1 }}>Aperçu du Rapport</h2>
    </header>
    <section style={{ padding: '0 40px 32px 40px' }}>
      {/* Projet Info minimaliste */}
      <div style={{ marginBottom: 34 }}>
        <h3 style={{ fontWeight: 600, color: '#7f5af0', fontSize: 17, marginBottom: 10, letterSpacing: 0.2 }}>Informations du Projet</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(projectInfo || {}).map(([key, value]) => (
            <li key={key} style={{
              borderBottom: '1px solid #f2f2f2',
              padding: '7px 0',
              fontSize: 15,
              color: '#232323',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ fontWeight: 500, color: '#6f6f6f', minWidth: 160 }}>{PROJECT_INFO_LABELS[key] || key} :</span>
              <span style={{ fontWeight: 400 }}>{value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Évaluation minimaliste */}
      <div>
        <h3 style={{ fontWeight: 600, color: '#2cb67d', fontSize: 17, marginBottom: 10 }}>Évaluation</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(evaluation || {}).map(([category, subcats]) => (
            <li key={category} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, color: '#232323', fontSize: 15, marginBottom: 6, letterSpacing: 0.1 }}>
                {EVAL_LABELS[category]?.label || category}
              </div>
              {typeof subcats === 'object' && subcats !== null && Object.entries(subcats).map(([subcategory, fields]) => (
                <div key={subcategory} style={{ marginBottom: 4 }}>
                  <div style={{ fontWeight: 500, color: '#7f5af0', fontSize: 14, marginBottom: 2, marginLeft: 8 }}>
                    {EVAL_LABELS[category]?.[subcategory]?.label || subcategory}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {typeof fields === 'object' && fields !== null && Object.entries(fields).map(([field, checked]) => (
                      <li key={field} style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: checked ? 600 : 400,
                        color: checked ? '#2cb67d' : '#444',
                        fontSize: 14,
                        marginLeft: 18,
                        padding: '2px 0',
                      }}>
                        <span style={{ fontSize: 15, marginRight: 8, color: checked ? '#2cb67d' : '#bbb' }}>{checked ? '✔' : '✖'}</span>
                        <span>{EVAL_LABELS[category]?.[subcategory]?.[field] || field}</span>
                        <span style={{ marginLeft: 10, color: checked ? '#2cb67d' : '#bbb', fontWeight: 500 }}>{checked ? 'Oui' : 'Non'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
    <div style={{ fontSize: 12, color: '#888', marginTop: 24, textAlign: 'right', paddingRight: 40 }}>
      Rapport généré le {new Date().toLocaleDateString('fr-FR')}
    </div>
  </div>
);
