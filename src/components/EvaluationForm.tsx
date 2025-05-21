
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
  
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="section-title">Évaluation NOVALGO </h2>
      
      {/* Materials (15 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Matériaux </h3>
        
        {/* Local Materials  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Matériaux Locaux </h4>
          {renderCheckbox('materials', 'local', 'geographic', 'Origine géographique des matériaux < 300 km', EVALUATION_POINTS.materials.local.geographic)}
          {renderCheckbox('materials', 'local', 'percentage', 'Part de matériaux locaux dans le total utilisé', EVALUATION_POINTS.materials.local.percentage)}
          {renderCheckbox('materials', 'local', 'economy', 'Contribution à l’économie locale et aux savoir-faire traditionnels', EVALUATION_POINTS.materials.local.economy)}
        </div>
        
        {/* Low Impact Materials  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Matériaux à Faible Impact </h4>
          {renderCheckbox('materials', 'lowImpact', 'lifecycle', 'Analyse du cycle de vie (ACV) favorable', EVALUATION_POINTS.materials.lowImpact.lifecycle)}
          {renderCheckbox('materials', 'lowImpact', 'biosourced', ' Utilisation de matériaux biosourcés', EVALUATION_POINTS.materials.lowImpact.biosourced)}
          {renderCheckbox('materials', 'lowImpact', 'local', 'Utilisation de matériaux locaux', EVALUATION_POINTS.materials.lowImpact.local)}
          {renderCheckbox('materials', 'lowImpact', 'lowVOC', 'Faible émission de composés organiques volatils (COV)', EVALUATION_POINTS.materials.lowImpact.lowVOC)}
        </div>
        
        {/* Waste Management  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Gestion des déchets de chantier</h4>
          {renderCheckbox('materials', 'waste', 'wastePlan', 'Plan de gestion des déchets en phase chantier', EVALUATION_POINTS.materials.waste.wastePlan)}
          {renderCheckbox('materials', 'waste', 'valorization', 'Taux de valorisation des déchets (> 50%)', EVALUATION_POINTS.materials.waste.valorization)}
          {renderCheckbox('materials', 'waste', 'sourceSorting', 'Tri à la source (bois, métal, plastique, inertes)', EVALUATION_POINTS.materials.waste.sourceSorting)}
        </div>
      </div>
      
      {/* Energy (20 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Énergie </h3>
        
        {/* Renewable Energy  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Utilisation de l’énergie renouvelable</h4>
          {renderCheckbox('energy', 'renewable', 'photovoltaic', 'Intégration du solaire photovoltaïque', EVALUATION_POINTS.energy.renewable.photovoltaic)}
          {renderCheckbox('energy', 'renewable', 'wind', 'Utilisation de l’énergie éolienne', EVALUATION_POINTS.energy.renewable.wind)}
          {renderCheckbox('energy', 'renewable', 'thermal', 'Utilisation de l’énergie solaire thermique', EVALUATION_POINTS.energy.renewable.thermal)}
        </div>
        
        {/* Insulation  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Isolation thermique adaptée </h4>
          {renderCheckbox('energy', 'insulation', 'materials', 'Choix de matériaux isolants écologiques', EVALUATION_POINTS.energy.insulation.materials)}
          {renderCheckbox('energy', 'insulation', 'walls', 'Isolation des murs et planchers', EVALUATION_POINTS.energy.insulation.walls)}
          {renderCheckbox('energy', 'insulation', 'roof', 'Isolation thermique de la toiture', EVALUATION_POINTS.energy.insulation.roof)}
          {renderCheckbox('energy', 'insulation', 'windows', 'Performance des menuiseries (fenêtres et portes)', EVALUATION_POINTS.energy.insulation.windows)}
        </div>
        
        {/* Orientation  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Orientation optimale </h4>
          {renderCheckbox('energy', 'orientation', 'facades', 'Orientation des façades idéales', EVALUATION_POINTS.energy.orientation.facades)}
          {renderCheckbox('energy', 'orientation', 'localContext', 'Adaptation au contexte local (topographie, ventsdominants, climat)', EVALUATION_POINTS.energy.orientation.localContext)}
          {renderCheckbox('energy', 'orientation', 'passiveSolar', 'Apports solaires passifs en hiver maximisés', EVALUATION_POINTS.energy.orientation.passiveSolar)}
        </div>
        
        {/* Ventilation  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Ventilation naturelle </h4>
          {renderCheckbox('energy', 'ventilation', 'cross', 'Présence d’ouvertures traversâtes', EVALUATION_POINTS.energy.ventilation.cross)}
          {renderCheckbox('energy', 'ventilation', 'wind', 'Orientation favorable aux vents dominants', EVALUATION_POINTS.energy.ventilation.wind)}
          {renderCheckbox('energy', 'ventilation', 'nocturnal', 'Dispositifs de su ventilation nocturne ou gaines d’extraction', EVALUATION_POINTS.energy.ventilation.nocturnal)}
        </div>
      </div>
      
      {/* Water (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Eau </h3>
        
        {/* Consumption (4 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Réduction de la consommation d’eau potable </h4>
          {renderCheckbox('water', 'consumption', 'flow', 'Débit des robinets, douches, WC (litres/min ou chasse)', EVALUATION_POINTS.water.consumption.flow)}
          {renderCheckbox('water', 'consumption', 'devices', 'Installation de dispositifs économes (aérateurs, mousseurs)', EVALUATION_POINTS.water.consumption.devices)}
          {renderCheckbox('water', 'consumption', 'awareness', 'Affichage ou sensibilisation des usagers à la sobriété', EVALUATION_POINTS.water.consumption.awareness)}
        </div>
        
        {/* Rainwater  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Récupération des eaux pluviales </h4>
          {renderCheckbox('water', 'rainwater', 'surface', 'Surface de collecte disponible (toitures, terrasses)', EVALUATION_POINTS.water.rainwater.surface)}
          {renderCheckbox('water', 'rainwater', 'storage', 'Capacité de stockage et réutilisation (sanitaires, jardin)', EVALUATION_POINTS.water.rainwater.storage)}
          {renderCheckbox('water', 'rainwater', 'filtration', 'Système de filtration et maintenance', EVALUATION_POINTS.water.rainwater.filtration)}
        </div>
        
        {/* Wastewater  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Gestion des eaux usées </h4>
          {renderCheckbox('water', 'wastewater', 'pretreatment', 'Présence d’un prétraitement ou d’un système d’épuration local', EVALUATION_POINTS.water.wastewater.pretreatment)}
          {renderCheckbox('water', 'wastewater', 'separation', 'Séparation des eaux grises et noires si applicable ', EVALUATION_POINTS.water.wastewater.separation)}
          {renderCheckbox('water', 'wastewater', 'reuse', 'Réutilisation éventuelle des eaux grises (lavage, arrosage)', EVALUATION_POINTS.water.wastewater.reuse)}
        </div>
      </div>
      
      {/* Comfort (15 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Confort </h3>
        
        {/* Thermal  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Confort thermique passif </h4>
          {renderCheckbox('comfort', 'thermal', 'temperature', 'Température intérieure stable sans climatisation', EVALUATION_POINTS.comfort.thermal.temperature)}
          {renderCheckbox('comfort', 'thermal', 'bioclimatic', 'Orientation bioclimatique du bâtiment', EVALUATION_POINTS.comfort.thermal.bioclimatic)}
          {renderCheckbox('comfort', 'thermal', 'solarProtection', 'Protection solaire passive (brise-soleil, volets)', EVALUATION_POINTS.comfort.thermal.solarProtection)}
        </div>
        
        {/* Acoustic  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Confort acoustique          </h4>
          {renderCheckbox('comfort', 'acoustic', 'insulation', 'Isolation acoustique des parois', EVALUATION_POINTS.comfort.acoustic.insulation)}
          {renderCheckbox('comfort', 'acoustic', 'windows', 'Qualité des menuiseries extérieures', EVALUATION_POINTS.comfort.acoustic.windows)}
          {renderCheckbox('comfort', 'acoustic', 'noise', 'Protection contre les nuisances extérieures', EVALUATION_POINTS.comfort.acoustic.noise)}
        </div>
        
        {/* Visual  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Confort visuelle </h4>
          {renderCheckbox('comfort', 'visual', 'naturalLight', 'Facteur de lumière naturelle idéal ', EVALUATION_POINTS.comfort.visual.naturalLight)}
          {renderCheckbox('comfort', 'visual', 'uniform', 'Bonne répartition de la lumière (éviter les contrastes)', EVALUATION_POINTS.comfort.visual.uniform)}
          {renderCheckbox('comfort', 'visual', 'depth', 'Profondeur des pièces compatible avec l’éclairement naturel', EVALUATION_POINTS.comfort.visual.depth)}
        </div>
        {/* Olfactory Comfort */}
        <div className="mb-4">
          <h4 className="subcategory-title">Confort olfactif</h4>
          {renderCheckbox('comfort', 'olfactory', 'ventilationSizing', 'Bon dimensionnement de la ventilation dans les zones sensibles (cuisine, WC)', EVALUATION_POINTS.comfort.olfactory.ventilationSizing)}
          {renderCheckbox('comfort', 'olfactory', 'separation', 'Séparation des espaces par usage (technique / habité)', EVALUATION_POINTS.comfort.olfactory.separation)}
          {renderCheckbox('comfort', 'olfactory', 'materialChoice', 'Choix de matériaux inodores ou naturellement parfumés (bois, argile...)', EVALUATION_POINTS.comfort.olfactory.materialChoice)}
        </div>        
        {/* Hygrothermal Comfort */}
        <div className="mb-4">
          <h4 className="subcategory-title">Confort hygrothermique</h4>
          {renderCheckbox('comfort', 'hygrometric', 'humidityRegulation', 'Utilisation de matériaux régulateurs d’humidité de matériaux respirant (terre crue, enduits naturels)', EVALUATION_POINTS.comfort.hygrometric.humidityRegulation)}
          {renderCheckbox('comfort', 'hygrometric', 'humidityVentilation', 'Ventilation adaptée au contrôle de l’humidité (Aération naturelle ou mécanique ou croisée ou VMC)', EVALUATION_POINTS.comfort.hygrometric.humidityVentilation)}
          {renderCheckbox('comfort', 'hygrometric', 'capillaryProtection', 'Protection contre les remontées capillaires (Mise en place de coupures capillaires)', EVALUATION_POINTS.comfort.hygrometric.capillaryProtection)}
          {renderCheckbox('comfort', 'hygrometric', 'waterproofing', 'Étanchéité à l’eau de pluie et à l’humidité extérieure', EVALUATION_POINTS.comfort.hygrometric.waterproofing)}
        </div>
      </div>

      {/* Waste */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Déchets </h3>
        
        {/* Construction  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Tri en phase chantier </h4>
          {renderCheckbox('waste', 'construction', 'triZone', 'Zone de tri identifiée sur site', EVALUATION_POINTS.waste.construction.triZone)}
          {renderCheckbox('waste', 'construction', 'awareness', 'Formation/sensibilisation des ouvriers', EVALUATION_POINTS.waste.construction.awareness)}
          {renderCheckbox('waste', 'construction', 'control', 'Contrôle du tri par entreprise ou bureau de contrôle', EVALUATION_POINTS.waste.construction.control)}
        </div>
        
        {/* Operation  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Tri en phase exploitation </h4>
          {renderCheckbox('waste', 'operation', 'bins', 'Présence de poubelles multi-flux', EVALUATION_POINTS.waste.operation.bins)}
          {renderCheckbox('waste', 'operation', 'wasteRoom', 'Local à déchets ventilé et accessible', EVALUATION_POINTS.waste.operation.wasteRoom)}
          {renderCheckbox('waste', 'operation', 'signage', 'Information des usagers (pictogrammes, consignes)', EVALUATION_POINTS.waste.operation.signage)}
        </div>
      </div>
      
      {/* Economy (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Économie </h3>
        
        {/* Cost  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Coût global maîtrisé </h4>
          {renderCheckbox('economy', 'cost', 'initial', 'Réduction du coût de construction initial', EVALUATION_POINTS.economy.cost.initial)}
          {renderCheckbox('economy', 'cost', 'maintenance', 'Réduction des coûts d’exploitation et d’entretien', EVALUATION_POINTS.economy.cost.maintenance)}
          {renderCheckbox('economy', 'cost', 'flexibility', 'Flexibilité et évolutivité du bâtiment', EVALUATION_POINTS.economy.cost.flexibility)}
          {renderCheckbox('economy', 'cost', 'qualityPrice', 'Optimisation du rapport qualité/prix', EVALUATION_POINTS.economy.cost.qualityPrice)}
        </div>
        
        {/* Solutions  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Solutions à bon rapport coût/performance </h4>
          {renderCheckbox('economy', 'solutions', 'simpleSystems', 'Choix de systèmes simples et efficaces', EVALUATION_POINTS.economy.solutions.simpleSystems)}
          {renderCheckbox('economy', 'solutions', 'multifunctional', 'Optimisation des coûts par des matériaux multifonctions', EVALUATION_POINTS.economy.solutions.multifunctional)}
          {renderCheckbox('economy', 'solutions', 'localLabor', 'Main-d’œuvre qualifiée locale', EVALUATION_POINTS.economy.solutions.localLabor)}
        </div>
      </div>
      
      {/* Biodiversity (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Biodiversité </h3>
        
        {/* Vegetation (4 pts) */}
        <div className="mb-4">
          <h4 className="subcategory-title">Préservation de la végétation existante </h4>
          {renderCheckbox('biodiversity', 'vegetation', 'preservation', 'Arbres conservés sur le site', EVALUATION_POINTS.biodiversity.vegetation.preservation)}
          {renderCheckbox('biodiversity', 'vegetation', 'protection', 'Protection pendant le chantier (barrières, paillage)', EVALUATION_POINTS.biodiversity.vegetation.protection)}
          {renderCheckbox('biodiversity', 'vegetation', 'integration', 'Intégration dans le projet paysager final', EVALUATION_POINTS.biodiversity.vegetation.integration)}
        </div>
        
        {/* Biodiversity  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Protection de la biodiversité          </h4>
          {renderCheckbox('biodiversity', 'biodiversity', 'inventory', 'Inventaire de la faune/flore avant-projet', EVALUATION_POINTS.biodiversity.biodiversity.inventory)}
          {renderCheckbox('biodiversity', 'biodiversity', 'corridors', 'Maintien ou création de corridors écologiques', EVALUATION_POINTS.biodiversity.biodiversity.corridors)}
          {renderCheckbox('biodiversity', 'biodiversity', 'nuisance', 'Limitation des nuisances lumineuses et sonores', EVALUATION_POINTS.biodiversity.biodiversity.nuisance)}
        </div>
        
        {/* Site  */}
        <div className="mb-4">
          <h4 className="subcategory-title">intégration au site naturel          </h4>
          {renderCheckbox('biodiversity', 'site', 'relief', 'Respect du relief naturel (pas de nivellement excessif)', EVALUATION_POINTS.biodiversity.site.relief)}
          {renderCheckbox('biodiversity', 'site', 'materials', 'Choix de matériaux en harmonie avec le paysage', EVALUATION_POINTS.biodiversity.site.materials)}
          {renderCheckbox('biodiversity', 'site', 'topography', 'Adaptation à la topographie (terrasses, pilotis)', EVALUATION_POINTS.biodiversity.site.topography)}
        </div>
      </div>
      
      {/* Safety (10 pts) */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="category-title"> Sécurité </h3>
        
        {/* Fire  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Sécurité incendie </h4>
          {renderCheckbox('safety', 'fire', 'detection', 'Présence de systèmes de détection incendie', EVALUATION_POINTS.safety.fire.detection)}
          {renderCheckbox('safety', 'fire', 'means', 'Moyens de lutte contre l’incendie', EVALUATION_POINTS.safety.fire.means)}
          {renderCheckbox('safety', 'fire', 'materials', 'Matériaux de construction résistants au feu', EVALUATION_POINTS.safety.fire.materials)}
          {renderCheckbox('safety', 'fire', 'evacuation', 'Plan d’évacuation visible et formation', EVALUATION_POINTS.safety.fire.evacuation)}
        </div>
        
        {/* Accessibility  */}
        <div className="mb-4">
          <h4 className="subcategory-title">Accessibilité et sécurité des usagers </h4>
          {renderCheckbox('safety', 'accessibility', 'pathways', 'Accessibilité des cheminements extérieurs', EVALUATION_POINTS.safety.accessibility.pathways)}
          {renderCheckbox('safety', 'accessibility', 'access', 'Accès aux services essentiels', EVALUATION_POINTS.safety.accessibility.access)}
          {renderCheckbox('safety', 'accessibility', 'signage', 'Signalétique adaptée', EVALUATION_POINTS.safety.accessibility.signage)}
          {renderCheckbox('safety', 'accessibility', 'internal', 'Sécurité des circulations intérieures', EVALUATION_POINTS.safety.accessibility.internal)}
        </div>
      </div>
      
      <button 
        onClick={onCalculate}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
      >
        Calculer le Score
      </button>
    </div>
  );
};

export default EvaluationForm;
