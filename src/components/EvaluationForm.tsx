
import React from 'react';
import { EvaluationScores } from '../lib/types';
import { EVALUATION_POINTS, CATEGORY_TOTALS, CATEGORY_ICONS } from '../lib/constants';

interface EvaluationFormProps {
  evaluation: EvaluationScores;
  onChange: (update: Partial<EvaluationScores>) => void;
  onCalculate: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ evaluation, onChange, onCalculate }) => {
  const handleCheckboxChange = (category: keyof EvaluationScores, subcategory: string, field: string, value: boolean) => {
    onChange({
      ...evaluation,
      [category]: {
        ...evaluation[category],
        [subcategory]: {
          ...evaluation[category][subcategory],
          [field]: value
        }
      }
    });
  };

  const renderCheckbox = (
    category: keyof EvaluationScores, 
    subcategory: string, 
    field: string, 
    label: string, 
    points: number
  ) => {
    const checked = evaluation[category][subcategory][field];
    
    return (
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id={`${category}-${subcategory}-${field}`}
          checked={checked}
          onChange={(e) => handleCheckboxChange(category, subcategory, field, e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label 
          htmlFor={`${category}-${subcategory}-${field}`} 
          className="ml-2 text-sm text-gray-600 flex-1"
        >
          {label} 
        </label>
        <span className="text-sm font-medium text-gray-700">{points} pts</span>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="section-title">Évaluation NOVALGO (100 points)</h2>
      
      {/* Materials (15 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.materials} Matériaux ({CATEGORY_TOTALS.materials} points)
        </h3>
        
        {/* Local Materials (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Matériaux Locaux (5 pts)</h4>
          {renderCheckbox('materials', 'local', 'geographic', 'Origine géographique (< 300 km)', EVALUATION_POINTS.materials.local.geographic)}
          {renderCheckbox('materials', 'local', 'percentage', 'Pourcentage utilisé', EVALUATION_POINTS.materials.local.percentage)}
          {renderCheckbox('materials', 'local', 'economy', 'Contribution économie locale', EVALUATION_POINTS.materials.local.economy)}
        </div>
        
        {/* Low Impact Materials (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Matériaux à Faible Impact (5 pts)</h4>
          {renderCheckbox('materials', 'lowImpact', 'lifecycle', 'Analyse du cycle de vie', EVALUATION_POINTS.materials.lowImpact.lifecycle)}
          {renderCheckbox('materials', 'lowImpact', 'biosourced', 'Biosourcé', EVALUATION_POINTS.materials.lowImpact.biosourced)}
          {renderCheckbox('materials', 'lowImpact', 'local', 'Matériaux locaux', EVALUATION_POINTS.materials.lowImpact.local)}
          {renderCheckbox('materials', 'lowImpact', 'lowVOC', 'Faibles émissions COV', EVALUATION_POINTS.materials.lowImpact.lowVOC)}
        </div>
        
        {/* Waste Management (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Gestion des Déchets (5 pts)</h4>
          {renderCheckbox('materials', 'waste', 'wastePlan', 'Plan de gestion', EVALUATION_POINTS.materials.waste.wastePlan)}
          {renderCheckbox('materials', 'waste', 'valorization', 'Valorisation >50%', EVALUATION_POINTS.materials.waste.valorization)}
          {renderCheckbox('materials', 'waste', 'sourceSorting', 'Tri à la source', EVALUATION_POINTS.materials.waste.sourceSorting)}
        </div>
      </div>
      
      {/* Energy (20 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.energy} Énergie ({CATEGORY_TOTALS.energy} points)
        </h3>
        
        {/* Renewable Energy (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Énergies Renouvelables (5 pts)</h4>
          {renderCheckbox('energy', 'renewable', 'photovoltaic', 'Photovoltaïque', EVALUATION_POINTS.energy.renewable.photovoltaic)}
          {renderCheckbox('energy', 'renewable', 'wind', 'Éolien', EVALUATION_POINTS.energy.renewable.wind)}
          {renderCheckbox('energy', 'renewable', 'thermal', 'Thermique', EVALUATION_POINTS.energy.renewable.thermal)}
        </div>
        
        {/* Insulation (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Isolation (5 pts)</h4>
          {renderCheckbox('energy', 'insulation', 'materials', 'Matériaux écologiques', EVALUATION_POINTS.energy.insulation.materials)}
          {renderCheckbox('energy', 'insulation', 'walls', 'Murs/planchers', EVALUATION_POINTS.energy.insulation.walls)}
          {renderCheckbox('energy', 'insulation', 'roof', 'Toiture', EVALUATION_POINTS.energy.insulation.roof)}
          {renderCheckbox('energy', 'insulation', 'windows', 'Fenêtres', EVALUATION_POINTS.energy.insulation.windows)}
        </div>
        
        {/* Orientation (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Orientation (5 pts)</h4>
          {renderCheckbox('energy', 'orientation', 'facades', 'Façades', EVALUATION_POINTS.energy.orientation.facades)}
          {renderCheckbox('energy', 'orientation', 'localContext', 'Contexte local', EVALUATION_POINTS.energy.orientation.localContext)}
          {renderCheckbox('energy', 'orientation', 'passiveSolar', 'Solaire passif', EVALUATION_POINTS.energy.orientation.passiveSolar)}
        </div>
        
        {/* Ventilation (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Ventilation (5 pts)</h4>
          {renderCheckbox('energy', 'ventilation', 'cross', 'Ventilation traversante', EVALUATION_POINTS.energy.ventilation.cross)}
          {renderCheckbox('energy', 'ventilation', 'wind', 'Orientation aux vents', EVALUATION_POINTS.energy.ventilation.wind)}
          {renderCheckbox('energy', 'ventilation', 'nocturnal', 'Nocturne', EVALUATION_POINTS.energy.ventilation.nocturnal)}
        </div>
      </div>
      
      {/* Water (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.water} Eau ({CATEGORY_TOTALS.water} points)
        </h3>
        
        {/* Consumption (4 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Consommation (4 pts)</h4>
          {renderCheckbox('water', 'consumption', 'flow', 'Débit contrôlé', EVALUATION_POINTS.water.consumption.flow)}
          {renderCheckbox('water', 'consumption', 'devices', 'Appareils efficaces', EVALUATION_POINTS.water.consumption.devices)}
          {renderCheckbox('water', 'consumption', 'awareness', 'Sensibilisation des usagers', EVALUATION_POINTS.water.consumption.awareness)}
        </div>
        
        {/* Rainwater (3 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Eau de Pluie (3 pts)</h4>
          {renderCheckbox('water', 'rainwater', 'surface', 'Surface de collecte', EVALUATION_POINTS.water.rainwater.surface)}
          {renderCheckbox('water', 'rainwater', 'storage', 'Stockage/réutilisation', EVALUATION_POINTS.water.rainwater.storage)}
          {renderCheckbox('water', 'rainwater', 'filtration', 'Filtration', EVALUATION_POINTS.water.rainwater.filtration)}
        </div>
        
        {/* Wastewater (3 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Eaux Usées (3 pts)</h4>
          {renderCheckbox('water', 'wastewater', 'pretreatment', 'Prétraitement', EVALUATION_POINTS.water.wastewater.pretreatment)}
          {renderCheckbox('water', 'wastewater', 'separation', 'Séparation gris/noir', EVALUATION_POINTS.water.wastewater.separation)}
          {renderCheckbox('water', 'wastewater', 'reuse', 'Réutilisation eau grise', EVALUATION_POINTS.water.wastewater.reuse)}
        </div>
      </div>
      
      {/* Comfort (15 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.comfort} Confort ({CATEGORY_TOTALS.comfort} points)
        </h3>
        
        {/* Thermal (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Thermique (5 pts)</h4>
          {renderCheckbox('comfort', 'thermal', 'temperature', 'Température stable', EVALUATION_POINTS.comfort.thermal.temperature)}
          {renderCheckbox('comfort', 'thermal', 'bioclimatic', 'Bioclimatique', EVALUATION_POINTS.comfort.thermal.bioclimatic)}
          {renderCheckbox('comfort', 'thermal', 'solarProtection', 'Protection solaire', EVALUATION_POINTS.comfort.thermal.solarProtection)}
        </div>
        
        {/* Acoustic (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Acoustique (5 pts)</h4>
          {renderCheckbox('comfort', 'acoustic', 'insulation', 'Isolation', EVALUATION_POINTS.comfort.acoustic.insulation)}
          {renderCheckbox('comfort', 'acoustic', 'windows', 'Fenêtres qualité', EVALUATION_POINTS.comfort.acoustic.windows)}
          {renderCheckbox('comfort', 'acoustic', 'noise', 'Réduction bruit extérieur', EVALUATION_POINTS.comfort.acoustic.noise)}
        </div>
        
        {/* Visual (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Visuel (5 pts)</h4>
          {renderCheckbox('comfort', 'visual', 'naturalLight', 'Lumière naturelle', EVALUATION_POINTS.comfort.visual.naturalLight)}
          {renderCheckbox('comfort', 'visual', 'uniform', 'Lumière uniforme', EVALUATION_POINTS.comfort.visual.uniform)}
          {renderCheckbox('comfort', 'visual', 'depth', 'Profondeur', EVALUATION_POINTS.comfort.visual.depth)}
        </div>
      </div>
      
      {/* Waste (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.waste} Déchets ({CATEGORY_TOTALS.waste} points)
        </h3>
        
        {/* Construction (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Construction (5 pts)</h4>
          {renderCheckbox('waste', 'construction', 'triZone', 'Zone de tri', EVALUATION_POINTS.waste.construction.triZone)}
          {renderCheckbox('waste', 'construction', 'awareness', 'Sensibilisation ouvriers', EVALUATION_POINTS.waste.construction.awareness)}
          {renderCheckbox('waste', 'construction', 'control', 'Contrôle', EVALUATION_POINTS.waste.construction.control)}
        </div>
        
        {/* Operation (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Exploitation (5 pts)</h4>
          {renderCheckbox('waste', 'operation', 'bins', 'Poubelles multi-flux', EVALUATION_POINTS.waste.operation.bins)}
          {renderCheckbox('waste', 'operation', 'wasteRoom', 'Local poubelle ventilé', EVALUATION_POINTS.waste.operation.wasteRoom)}
          {renderCheckbox('waste', 'operation', 'signage', 'Signalétique claire', EVALUATION_POINTS.waste.operation.signage)}
        </div>
      </div>
      
      {/* Economy (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.economy} Économie ({CATEGORY_TOTALS.economy} points)
        </h3>
        
        {/* Cost (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Coût (5 pts)</h4>
          {renderCheckbox('economy', 'cost', 'initial', 'Coût initial', EVALUATION_POINTS.economy.cost.initial)}
          {renderCheckbox('economy', 'cost', 'maintenance', 'Entretien', EVALUATION_POINTS.economy.cost.maintenance)}
          {renderCheckbox('economy', 'cost', 'flexibility', 'Flexibilité', EVALUATION_POINTS.economy.cost.flexibility)}
          {renderCheckbox('economy', 'cost', 'qualityPrice', 'Rapport qualité/prix', EVALUATION_POINTS.economy.cost.qualityPrice)}
        </div>
        
        {/* Solutions (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Solutions (5 pts)</h4>
          {renderCheckbox('economy', 'solutions', 'simpleSystems', 'Systèmes simples', EVALUATION_POINTS.economy.solutions.simpleSystems)}
          {renderCheckbox('economy', 'solutions', 'multifunctional', 'Matériaux multifonctions', EVALUATION_POINTS.economy.solutions.multifunctional)}
          {renderCheckbox('economy', 'solutions', 'localLabor', 'Main d\'œuvre locale', EVALUATION_POINTS.economy.solutions.localLabor)}
        </div>
      </div>
      
      {/* Biodiversity (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.biodiversity} Biodiversité ({CATEGORY_TOTALS.biodiversity} points)
        </h3>
        
        {/* Vegetation (4 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Végétation (4 pts)</h4>
          {renderCheckbox('biodiversity', 'vegetation', 'preservation', 'Préservation des arbres', EVALUATION_POINTS.biodiversity.vegetation.preservation)}
          {renderCheckbox('biodiversity', 'vegetation', 'protection', 'Protection pendant construction', EVALUATION_POINTS.biodiversity.vegetation.protection)}
          {renderCheckbox('biodiversity', 'vegetation', 'integration', 'Intégration paysagère', EVALUATION_POINTS.biodiversity.vegetation.integration)}
        </div>
        
        {/* Biodiversity (3 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Biodiversité (3 pts)</h4>
          {renderCheckbox('biodiversity', 'biodiversity', 'inventory', 'Inventaire', EVALUATION_POINTS.biodiversity.biodiversity.inventory)}
          {renderCheckbox('biodiversity', 'biodiversity', 'corridors', 'Corridors écologiques', EVALUATION_POINTS.biodiversity.biodiversity.corridors)}
          {renderCheckbox('biodiversity', 'biodiversity', 'nuisance', 'Réduction nuisances', EVALUATION_POINTS.biodiversity.biodiversity.nuisance)}
        </div>
        
        {/* Site (3 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Site (3 pts)</h4>
          {renderCheckbox('biodiversity', 'site', 'relief', 'Respect relief', EVALUATION_POINTS.biodiversity.site.relief)}
          {renderCheckbox('biodiversity', 'site', 'materials', 'Matériaux harmonieux', EVALUATION_POINTS.biodiversity.site.materials)}
          {renderCheckbox('biodiversity', 'site', 'topography', 'Topographie', EVALUATION_POINTS.biodiversity.site.topography)}
        </div>
      </div>
      
      {/* Safety (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title">
          {CATEGORY_ICONS.safety} Sécurité ({CATEGORY_TOTALS.safety} points)
        </h3>
        
        {/* Fire (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Incendie (5 pts)</h4>
          {renderCheckbox('safety', 'fire', 'detection', 'Détection', EVALUATION_POINTS.safety.fire.detection)}
          {renderCheckbox('safety', 'fire', 'means', 'Moyens', EVALUATION_POINTS.safety.fire.means)}
          {renderCheckbox('safety', 'fire', 'materials', 'Matériaux résistants', EVALUATION_POINTS.safety.fire.materials)}
          {renderCheckbox('safety', 'fire', 'evacuation', 'Plan évacuation', EVALUATION_POINTS.safety.fire.evacuation)}
        </div>
        
        {/* Accessibility (5 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Accessibilité (5 pts)</h4>
          {renderCheckbox('safety', 'accessibility', 'pathways', 'Cheminements', EVALUATION_POINTS.safety.accessibility.pathways)}
          {renderCheckbox('safety', 'accessibility', 'access', 'Accès services', EVALUATION_POINTS.safety.accessibility.access)}
          {renderCheckbox('safety', 'accessibility', 'signage', 'Signalétique', EVALUATION_POINTS.safety.accessibility.signage)}
          {renderCheckbox('safety', 'accessibility', 'internal', 'Sécurité interne', EVALUATION_POINTS.safety.accessibility.internal)}
        </div>
      </div>
      
      <button 
        onClick={onCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
      >
        Calculer le Score
      </button>
    </div>
  );
};

export default EvaluationForm;
