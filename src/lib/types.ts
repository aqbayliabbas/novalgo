
export interface ProjectInfo {
  projectName: string;
  buildingType: string;
  wilaya: string;
  daira: string;
  commune: string;
  climateZone: string;
  surfaceArea: number | '';
  numFloors: number | '';
  constructionYear: number | '';
  projectStage: string;
  maitreOeuvre: string;
  maitreOuvrage: string;
}

export interface EvaluationScores {
  materials: {
    local: {
      geographic: boolean;
      percentage: boolean;
      economy: boolean;
    };
    lowImpact: {
      lifecycle: boolean;
      biosourced: boolean;
      local: boolean;
      lowVOC: boolean;
    };
    waste: {
      wastePlan: boolean;
      valorization: boolean;
      sourceSorting: boolean;
    };
  };
  energy: {
    renewable: {
      photovoltaic: boolean;
      wind: boolean;
      thermal: boolean;
    };
    insulation: {
      materials: boolean;
      walls: boolean;
      roof: boolean;
      windows: boolean;
    };
    orientation: {
      facades: boolean;
      localContext: boolean;
      passiveSolar: boolean;
    };
    ventilation: {
      cross: boolean;
      wind: boolean;
      nocturnal: boolean;
    };
  };
  water: {
    consumption: {
      flow: boolean;
      devices: boolean;
      awareness: boolean;
    };
    rainwater: {
      surface: boolean;
      storage: boolean;
      filtration: boolean;
    };
    wastewater: {
      pretreatment: boolean;
      separation: boolean;
      reuse: boolean;
    };
  };
  comfort: {
    thermal: {
      temperature: boolean;
      bioclimatic: boolean;
      solarProtection: boolean;
    };
    acoustic: {
      insulation: boolean;
      windows: boolean;
      noise: boolean;
    };
    visual: {
      naturalLight: boolean;
      uniform: boolean;
      depth: boolean;
    };
    olfactory: {
      ventilationSizing: boolean;
      separation: boolean;
      materialChoice: boolean;
    };
    hygrometric: {
      humidityRegulation: boolean;
      humidityVentilation: boolean;
      capillaryProtection: boolean;
      waterproofing: boolean;
    };
  };
  waste: {
    construction: {
      triZone: boolean;
      awareness: boolean;
      control: boolean;
    };
    operation: {
      bins: boolean;
      wasteRoom: boolean;
      signage: boolean;
    };
  };
  economy: {
    cost: {
      initial: boolean;
      maintenance: boolean;
      flexibility: boolean;
      qualityPrice: boolean;
    };
    solutions: {
      simpleSystems: boolean;
      multifunctional: boolean;
      localLabor: boolean;
    };
  };
  biodiversity: {
    vegetation: {
      preservation: boolean;
      protection: boolean;
      integration: boolean;
    };
    biodiversity: {
      inventory: boolean;
      corridors: boolean;
      nuisance: boolean;
    };
    site: {
      relief: boolean;
      materials: boolean;
      topography: boolean;
    };
  };
  safety: {
    fire: {
      detection: boolean;
      means: boolean;
      materials: boolean;
      evacuation: boolean;
    };
    accessibility: {
      pathways: boolean;
      access: boolean;
      signage: boolean;
      internal: boolean;
    };
  };
}

export interface ScoreResult {
  totalScore: number;
  performanceLevel: string;
  isCalculated: boolean;
}

export interface FormState {
  projectInfo: ProjectInfo;
  evaluation: EvaluationScores;
  scoreResult: ScoreResult;
}
