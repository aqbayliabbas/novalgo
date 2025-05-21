
import React from 'react';
import { ProjectInfo } from '../lib/types';
import { BUILDING_TYPES, CLIMATE_ZONES, PROJECT_STAGES } from '../lib/constants';

interface ProjectFormProps {
  projectInfo: ProjectInfo;
  onChange: (update: Partial<ProjectInfo>) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectInfo, onChange }) => {
  return (
    <div className="mb-8">
      <h2 className="section-title text-center mb-8">Informations du Projet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Name */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="projectName" className="form-label">Nom du Projet</label>
          <input
            type="text"
            id="projectName"
            value={projectInfo.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Building Type */}
        <div>
          <label htmlFor="buildingType" className="form-label">Type de Bâtiment</label>
          <select
            id="buildingType"
            value={projectInfo.buildingType}
            onChange={(e) => onChange({ buildingType: e.target.value })}
            className="input-field"
          >
            <option value="">Sélectionner</option>
            {BUILDING_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Climate Zone */}
        <div>
          <label htmlFor="climateZone" className="form-label">Zone Climatique</label>
          <select
            id="climateZone"
            value={projectInfo.climateZone}
            onChange={(e) => onChange({ climateZone: e.target.value })}
            className="input-field"
          >
            <option value="">Sélectionner</option>
            {CLIMATE_ZONES.map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>

        {/* Location - Wilaya */}
        <div>
          <label htmlFor="wilaya" className="form-label">Wilaya</label>
          <input
            type="text"
            id="wilaya"
            value={projectInfo.wilaya}
            onChange={(e) => onChange({ wilaya: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Location - Daira */}
        <div>
          <label htmlFor="daira" className="form-label">Daïra</label>
          <input
            type="text"
            id="daira"
            value={projectInfo.daira}
            onChange={(e) => onChange({ daira: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Location - Commune */}
        <div>
          <label htmlFor="commune" className="form-label">Commune</label>
          <input
            type="text"
            id="commune"
            value={projectInfo.commune}
            onChange={(e) => onChange({ commune: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Surface Area */}
        <div>
          <label htmlFor="surfaceArea" className="form-label">Surface (m²)</label>
          <input
            type="number"
            id="surfaceArea"
            value={projectInfo.surfaceArea}
            onChange={(e) => onChange({ surfaceArea: e.target.value ? Number(e.target.value) : '' })}
            min="0"
            className="input-field"
          />
        </div>

        {/* Number of Floors */}
        <div>
          <label htmlFor="numFloors" className="form-label">Nombre d'Étages</label>
          <input
            type="number"
            id="numFloors"
            value={projectInfo.numFloors}
            onChange={(e) => onChange({ numFloors: e.target.value ? Number(e.target.value) : '' })}
            min="0"
            className="input-field"
          />
        </div>

        {/* Construction Year */}
        <div>
          <label htmlFor="constructionYear" className="form-label">Année de Construction/Rénovation</label>
          <input
            type="number"
            id="constructionYear"
            value={projectInfo.constructionYear}
            onChange={(e) => onChange({ constructionYear: e.target.value ? Number(e.target.value) : '' })}
            min="1800"
            className="input-field"
          />
        </div>

        {/* Project Stage */}
        <div>
          <label htmlFor="projectStage" className="form-label">Phase du Projet</label>
          <select
            id="projectStage"
            value={projectInfo.projectStage}
            onChange={(e) => onChange({ projectStage: e.target.value })}
            className="input-field"
          >
            <option value="">Sélectionner</option>
            {PROJECT_STAGES.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>

        {/* Client */}
        <div>
          <label htmlFor="client" className="form-label">Maitre oeuvre</label>
          <input
            type="text"
            id="client"
            value={projectInfo.maitreOeuvre}
            onChange={(e) => onChange({ maitreOeuvre: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Architect */}
        <div>
          <label htmlFor="architect" className="form-label">Maitre ouvrage</label>
          <input
            type="text"
            id="architect"
            value={projectInfo.maitreOuvrage}
            onChange={(e) => onChange({ maitreOuvrage: e.target.value })}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
