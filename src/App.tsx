import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ReportPreviewModal from './components/ReportPreviewModal';
import { downloadPreviewAsPDF, downloadFormAndEvalAsPDF } from './htmlToPDF';
import ProjectForm from './components/ProjectForm';
import EvaluationForm from './components/EvaluationForm';
import ScoreResult from './components/ScoreResult';
import ScrollToResultButton from './components/ScrollToResultButton';
import LandingPage from './components/LandingPage';
import { FormState, ProjectInfo, EvaluationScores } from './lib/types';
import { PERFORMANCE_LEVELS, EVALUATION_POINTS } from './lib/constants';
import { toast } from './hooks/use-toast';

const App: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async () => {
    // Export plain text PDF (no design)
    downloadFormAndEvalAsPDF(
      formState.projectInfo,
      formState.evaluation,
      formState.scoreResult
    );
  };

  const [showLanding, setShowLanding] = useState(true);
  const [formState, setFormState] = useState<FormState>({
    projectInfo: {
      projectName: '',
      buildingType: '',
      wilaya: '',
      daira: '',
      commune: '',
      climateZone: '',
      surfaceArea: '',
      numFloors: '',
      constructionYear: '',
      projectStage: '',
      // client: '',
      // architect: '',
    },
    evaluation: {
      materials: {
        local: { geographic: false, percentage: false, economy: false },
        lowImpact: { lifecycle: false, biosourced: false, local: false, lowVOC: false },
        waste: { wastePlan: false, valorization: false, sourceSorting: false }
      },
      energy: {
        renewable: { photovoltaic: false, wind: false, thermal: false },
        insulation: { materials: false, walls: false, roof: false, windows: false },
        orientation: { facades: false, localContext: false, passiveSolar: false },
        ventilation: { cross: false, wind: false, nocturnal: false }
      },
      water: {
        consumption: { flow: false, devices: false, awareness: false },
        rainwater: { surface: false, storage: false, filtration: false },
        wastewater: { pretreatment: false, separation: false, reuse: false }
      },
      comfort: {
        thermal: { temperature: false, bioclimatic: false, solarProtection: false },
        acoustic: { insulation: false, windows: false, noise: false },
        visual: { naturalLight: false, uniform: false, depth: false }
      },
      waste: {
        construction: { triZone: false, awareness: false, control: false },
        operation: { bins: false, wasteRoom: false, signage: false }
      },
      economy: {
        cost: { initial: false, maintenance: false, flexibility: false, qualityPrice: false },
        solutions: { simpleSystems: false, multifunctional: false, localLabor: false }
      },
      biodiversity: {
        vegetation: { preservation: false, protection: false, integration: false },
        biodiversity: { inventory: false, corridors: false, nuisance: false },
        site: { relief: false, materials: false, topography: false }
      },
      safety: {
        fire: { detection: false, means: false, materials: false, evacuation: false },
        accessibility: { pathways: false, access: false, signage: false, internal: false }
      }
    },
    scoreResult: {
      totalScore: 0,
      performanceLevel: '',
      isCalculated: false
    }
  });

  const handleProjectChange = (update: Partial<ProjectInfo>) => {
    setFormState(prev => ({
      ...prev,
      projectInfo: {
        ...prev.projectInfo,
        ...update
      }
    }));
  };

  const handleEvaluationChange = (update: Partial<EvaluationScores>) => {
    setFormState(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        ...update
      }
    }));
  };

  const calculateScore = () => {
    // Validate project info
    if (!formState.projectInfo.projectName) {
      toast({
        title: "Information manquante",
        description: "Veuillez saisir le nom du projet.",
        variant: "destructive"
      });
      return;
    }
    
    let totalScore = 0;
    
    // Calculate points for Materials
    const materials = formState.evaluation.materials;
    if (materials.local.geographic) totalScore += EVALUATION_POINTS.materials.local.geographic;
    if (materials.local.percentage) totalScore += EVALUATION_POINTS.materials.local.percentage;
    if (materials.local.economy) totalScore += EVALUATION_POINTS.materials.local.economy;
    
    if (materials.lowImpact.lifecycle) totalScore += EVALUATION_POINTS.materials.lowImpact.lifecycle;
    if (materials.lowImpact.biosourced) totalScore += EVALUATION_POINTS.materials.lowImpact.biosourced;
    if (materials.lowImpact.local) totalScore += EVALUATION_POINTS.materials.lowImpact.local;
    if (materials.lowImpact.lowVOC) totalScore += EVALUATION_POINTS.materials.lowImpact.lowVOC;
    
    if (materials.waste.wastePlan) totalScore += EVALUATION_POINTS.materials.waste.wastePlan;
    if (materials.waste.valorization) totalScore += EVALUATION_POINTS.materials.waste.valorization;
    if (materials.waste.sourceSorting) totalScore += EVALUATION_POINTS.materials.waste.sourceSorting;
    
    // Calculate points for Energy
    const energy = formState.evaluation.energy;
    if (energy.renewable.photovoltaic) totalScore += EVALUATION_POINTS.energy.renewable.photovoltaic;
    if (energy.renewable.wind) totalScore += EVALUATION_POINTS.energy.renewable.wind;
    if (energy.renewable.thermal) totalScore += EVALUATION_POINTS.energy.renewable.thermal;
    
    if (energy.insulation.materials) totalScore += EVALUATION_POINTS.energy.insulation.materials;
    if (energy.insulation.walls) totalScore += EVALUATION_POINTS.energy.insulation.walls;
    if (energy.insulation.roof) totalScore += EVALUATION_POINTS.energy.insulation.roof;
    if (energy.insulation.windows) totalScore += EVALUATION_POINTS.energy.insulation.windows;
    
    if (energy.orientation.facades) totalScore += EVALUATION_POINTS.energy.orientation.facades;
    if (energy.orientation.localContext) totalScore += EVALUATION_POINTS.energy.orientation.localContext;
    if (energy.orientation.passiveSolar) totalScore += EVALUATION_POINTS.energy.orientation.passiveSolar;
    
    if (energy.ventilation.cross) totalScore += EVALUATION_POINTS.energy.ventilation.cross;
    if (energy.ventilation.wind) totalScore += EVALUATION_POINTS.energy.ventilation.wind;
    if (energy.ventilation.nocturnal) totalScore += EVALUATION_POINTS.energy.ventilation.nocturnal;
    
    // Calculate points for Water
    const water = formState.evaluation.water;
    if (water.consumption.flow) totalScore += EVALUATION_POINTS.water.consumption.flow;
    if (water.consumption.devices) totalScore += EVALUATION_POINTS.water.consumption.devices;
    if (water.consumption.awareness) totalScore += EVALUATION_POINTS.water.consumption.awareness;
    
    if (water.rainwater.surface) totalScore += EVALUATION_POINTS.water.rainwater.surface;
    if (water.rainwater.storage) totalScore += EVALUATION_POINTS.water.rainwater.storage;
    if (water.rainwater.filtration) totalScore += EVALUATION_POINTS.water.rainwater.filtration;
    
    if (water.wastewater.pretreatment) totalScore += EVALUATION_POINTS.water.wastewater.pretreatment;
    if (water.wastewater.separation) totalScore += EVALUATION_POINTS.water.wastewater.separation;
    if (water.wastewater.reuse) totalScore += EVALUATION_POINTS.water.wastewater.reuse;
    
    // Calculate points for Comfort
    const comfort = formState.evaluation.comfort;
    if (comfort.thermal.temperature) totalScore += EVALUATION_POINTS.comfort.thermal.temperature;
    if (comfort.thermal.bioclimatic) totalScore += EVALUATION_POINTS.comfort.thermal.bioclimatic;
    if (comfort.thermal.solarProtection) totalScore += EVALUATION_POINTS.comfort.thermal.solarProtection;
    
    if (comfort.acoustic.insulation) totalScore += EVALUATION_POINTS.comfort.acoustic.insulation;
    if (comfort.acoustic.windows) totalScore += EVALUATION_POINTS.comfort.acoustic.windows;
    if (comfort.acoustic.noise) totalScore += EVALUATION_POINTS.comfort.acoustic.noise;
    
    if (comfort.visual.naturalLight) totalScore += EVALUATION_POINTS.comfort.visual.naturalLight;
    if (comfort.visual.uniform) totalScore += EVALUATION_POINTS.comfort.visual.uniform;
    if (comfort.visual.depth) totalScore += EVALUATION_POINTS.comfort.visual.depth;
    
    // Calculate points for Waste
    const waste = formState.evaluation.waste;
    if (waste.construction.triZone) totalScore += EVALUATION_POINTS.waste.construction.triZone;
    if (waste.construction.awareness) totalScore += EVALUATION_POINTS.waste.construction.awareness;
    if (waste.construction.control) totalScore += EVALUATION_POINTS.waste.construction.control;
    
    if (waste.operation.bins) totalScore += EVALUATION_POINTS.waste.operation.bins;
    if (waste.operation.wasteRoom) totalScore += EVALUATION_POINTS.waste.operation.wasteRoom;
    if (waste.operation.signage) totalScore += EVALUATION_POINTS.waste.operation.signage;
    
    // Calculate points for Economy
    const economy = formState.evaluation.economy;
    if (economy.cost.initial) totalScore += EVALUATION_POINTS.economy.cost.initial;
    if (economy.cost.maintenance) totalScore += EVALUATION_POINTS.economy.cost.maintenance;
    if (economy.cost.flexibility) totalScore += EVALUATION_POINTS.economy.cost.flexibility;
    if (economy.cost.qualityPrice) totalScore += EVALUATION_POINTS.economy.cost.qualityPrice;
    
    if (economy.solutions.simpleSystems) totalScore += EVALUATION_POINTS.economy.solutions.simpleSystems;
    if (economy.solutions.multifunctional) totalScore += EVALUATION_POINTS.economy.solutions.multifunctional;
    if (economy.solutions.localLabor) totalScore += EVALUATION_POINTS.economy.solutions.localLabor;
    
    // Calculate points for Biodiversity
    const biodiversity = formState.evaluation.biodiversity;
    if (biodiversity.vegetation.preservation) totalScore += EVALUATION_POINTS.biodiversity.vegetation.preservation;
    if (biodiversity.vegetation.protection) totalScore += EVALUATION_POINTS.biodiversity.vegetation.protection;
    if (biodiversity.vegetation.integration) totalScore += EVALUATION_POINTS.biodiversity.vegetation.integration;
    
    if (biodiversity.biodiversity.inventory) totalScore += EVALUATION_POINTS.biodiversity.biodiversity.inventory;
    if (biodiversity.biodiversity.corridors) totalScore += EVALUATION_POINTS.biodiversity.biodiversity.corridors;
    if (biodiversity.biodiversity.nuisance) totalScore += EVALUATION_POINTS.biodiversity.biodiversity.nuisance;
    
    if (biodiversity.site.relief) totalScore += EVALUATION_POINTS.biodiversity.site.relief;
    if (biodiversity.site.materials) totalScore += EVALUATION_POINTS.biodiversity.site.materials;
    if (biodiversity.site.topography) totalScore += EVALUATION_POINTS.biodiversity.site.topography;
    
    // Calculate points for Safety
    const safety = formState.evaluation.safety;
    if (safety.fire.detection) totalScore += EVALUATION_POINTS.safety.fire.detection;
    if (safety.fire.means) totalScore += EVALUATION_POINTS.safety.fire.means;
    if (safety.fire.materials) totalScore += EVALUATION_POINTS.safety.fire.materials;
    if (safety.fire.evacuation) totalScore += EVALUATION_POINTS.safety.fire.evacuation;
    
    if (safety.accessibility.pathways) totalScore += EVALUATION_POINTS.safety.accessibility.pathways;
    if (safety.accessibility.access) totalScore += EVALUATION_POINTS.safety.accessibility.access;
    if (safety.accessibility.signage) totalScore += EVALUATION_POINTS.safety.accessibility.signage;
    if (safety.accessibility.internal) totalScore += EVALUATION_POINTS.safety.accessibility.internal;
    
    // Round to 2 decimal places
    totalScore = Math.round(totalScore * 100) / 100;
    
    // Determine performance level
    let performanceLevel = '';
    if (totalScore < 45) {
      performanceLevel = 'Insuffisant';
    } else if (totalScore < 65) {
      performanceLevel = 'Moyen';
    } else if (totalScore < 85) {
      performanceLevel = 'Bon';
    } else {
      performanceLevel = 'Excellent';
    }
    
    setFormState(prev => ({
      ...prev,
      scoreResult: {
        totalScore,
        performanceLevel,
        isCalculated: true
      }
    }));
    
    // Scroll to results with delay to ensure DOM update
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
    
    toast({
      title: "Score calculé",
      description: `Votre projet a obtenu ${totalScore} points (${performanceLevel}).`,
    });
  };

  const startEvaluation = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={startEvaluation} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          {showLanding ? (
            <Header onGetStarted={startEvaluation} />
          ) : (
            <Header onBack={() => setShowLanding(true)} />
          )}
          
          <ProjectForm 
            projectInfo={formState.projectInfo} 
            onChange={handleProjectChange} 
          />
          
          <EvaluationForm 
            evaluation={formState.evaluation}
            onChange={handleEvaluationChange}
            onCalculate={calculateScore}
          />

          {formState.scoreResult.isCalculated && (
            <>
              <ScoreResult scoreResult={formState.scoreResult} />
              <div className="flex flex-col items-center mt-8 gap-4">
                <motion.button
                  className="px-6 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                  onClick={() => setShowPreview(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Preview Rapport
                </motion.button>
                <motion.button
                  className="px-6 py-2 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                  onClick={() => handleDownload()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download
                </motion.button>
              </div>
              <AnimatePresence>
                {showPreview && (
                  <ReportPreviewModal
                    open={showPreview}
                    onClose={() => setShowPreview(false)}
                    projectInfo={formState.projectInfo}
                    evaluation={formState.evaluation}
                    scoreResult={formState.scoreResult}
                    previewId="pdf-preview-content"
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
      <ScrollToResultButton isResultCalculated={formState.scoreResult.isCalculated} />
    </div>
  );
};

export default App;
