
export const BUILDING_TYPES = [
  "Logement individuel",
  "Logement collectif",
  "Équipement public",
  "Bâtiment tertiaire",
  "Mixte",
  "Autre"
];

export const CLIMATE_ZONES = [
  "Nord littoral humide",
  "Hauts Plateaux semi-arides",
  "Zone saharienne",
  "Montagne / zone froide",
  "Autre / incertaine"
];

export const PROJECT_STAGES = [
  "Esquisse / étude préliminaire",
  "Avant-projet sommaire (APS)",
  "Avant-projet détaillé (APD)",
  "Projet en chantier",
  "Projet réalisé"
];

export const PERFORMANCE_LEVELS = [
  {
    min: 0,
    max: 45,
    label: "Insuffisant",
    color: "text-red-600"
  },
  {
    min: 45,
    max: 65,
    label: "Moyen",
    color: "text-yellow-600"
  },
  {
    min: 65,
    max: 85,
    label: "Bon",
    color: "text-green-600"
  },
  {
    min: 85,
    max: 100,
    label: "Excellent",
    color: "text-emerald-600"
  }
];

export const EVALUATION_POINTS = {
  materials: {
    local: {
      geographic: 1.75,
      percentage: 1.75,
      economy: 1.5
    },
    lowImpact: {
      lifecycle: 1.25,
      biosourced: 1.25,
      local: 1.25,
      lowVOC: 1.25
    },
    waste: {
      wastePlan: 1.75,
      valorization: 1.75,
      sourceSorting: 1.5
    }
  },
  energy: {
    renewable: {
      photovoltaic: 1.75,
      wind: 1.5,
      thermal: 1.75
    },
    insulation: {
      materials: 1.25,
      walls: 1.25,
      roof: 1.25,
      windows: 1.25
    },
    orientation: {
      facades: 1.75,
      localContext: 1.5,
      passiveSolar: 1.75
    },
    ventilation: {
      cross: 1.5,
      wind: 1.75,
      nocturnal: 1.75
    }
  },
  water: {
    consumption: {
      flow: 1.5,
      devices: 1.5,
      awareness: 1
    },
    rainwater: {
      surface: 1,
      storage: 1,
      filtration: 1
    },
    wastewater: {
      pretreatment: 1,
      separation: 1,
      reuse: 1
    }
  },
  comfort: {
    thermal: {
      temperature: 1,
      bioclimatic: 1,
      solarProtection: 1
    },
    acoustic: {
      insulation: 1,
      windows: 1,
      noise: 1
    },
    visual: {
      naturalLight: 1,
      uniform: 1,
      depth: 1
    },
    olfactory: {
      ventilationSizing: 1, // Bon dimensionnement de la ventilation dans les zones sensibles (cuisine, WC)
      separation: 1, // Séparation des espaces par usage (technique / habité)
      materialChoice: 1 // Choix de matériaux inodores ou naturellement parfumés (bois, argile...)
    },
    hygrometric: {
      humidityRegulation: 1, // Utilisation de matériaux régulateurs d’humidité de matériaux respirant (terre crue, enduits naturels)
      humidityVentilation: 1, // Ventilation adaptée au contrôle de l’humidité (Aération naturelle ou mécanique ou croisée ou VMC)
      capillaryProtection: 1, // Protection contre les remontées capillaires (Mise en place de coupures capillaires)
      waterproofing: 1 // Étanchéité à l’eau de pluie et à l’humidité extérieure
    }
  },
  waste: {
    construction: {
      triZone: 2,
      awareness: 2,
      control: 1
    },
    operation: {
      bins: 2,
      wasteRoom: 1,
      signage: 2
    }
  },
  economy: {
    cost: {
      initial: 1.25,
      maintenance: 1.25,
      flexibility: 1.25,
      qualityPrice: 1.25
    },
    solutions: {
      simpleSystems: 1.75,
      multifunctional: 1.5,
      localLabor: 1.75
    }
  },
  biodiversity: {
    vegetation: {
      preservation: 1.5,
      protection: 1.5,
      integration: 1
    },
    biodiversity: {
      inventory: 1,
      corridors: 1,
      nuisance: 1
    },
    site: {
      relief: 1,
      materials: 1,
      topography: 1
    }
  },
  safety: {
    fire: {
      detection: 1.5,
      means: 1.5,
      materials: 1,
      evacuation: 1
    },
    accessibility: {
      pathways: 1.25,
      access: 1.25,
      signage: 1.25,
      internal: 1.25
    }
  }
};

export const CATEGORY_TOTALS = {
  materials: 15,
  energy: 20,
  water: 10,
  comfort: 15,
  waste: 10,
  economy: 10,
  biodiversity: 10,
  safety: 10
};

export const CATEGORY_ICONS = {
  materials: "🧱",
  energy: "⚡",
  water: "💧",
  comfort: "🏠",
  waste: "♻️",
  economy: "💰",
  biodiversity: "🌿",
  safety: "🛡️"
};
