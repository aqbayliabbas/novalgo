
import React from 'react';
import { motion } from 'framer-motion';
import { ScoreResult as ScoreResultType } from '../lib/types';
import { PERFORMANCE_LEVELS } from '../lib/constants';

interface ScoreResultProps {
  scoreResult: ScoreResultType;
}

const ScoreResult: React.FC<ScoreResultProps> = ({ scoreResult }) => {
  const { totalScore, performanceLevel, isCalculated } = scoreResult;
  
  if (!isCalculated) return null;
  
  const level = PERFORMANCE_LEVELS.find(
    level => totalScore >= level.min && totalScore <= level.max
  );

  return (
    <motion.div
      id="result-section"
      className="p-6 bg-gray-50 rounded-lg border border-gray-200"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01, boxShadow: '0 4px 24px rgba(80,80,180,0.07)' }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="section-title mb-4">Résultat de l'Évaluation</h3>
      <div className="flex flex-col items-center mb-6">
        <motion.div
          className="text-5xl font-bold mb-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {totalScore}
          <span className="text-2xl text-gray-500 font-normal"> / 100</span>
        </motion.div>
        <motion.div
          className={`text-xl font-semibold ${level?.color}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Niveau: {performanceLevel}
        </motion.div>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4 mb-3">
        <motion.div
          className={`h-4 rounded-full ${
            totalScore < 45 ? 'bg-red-500' :
            totalScore < 65 ? 'bg-yellow-500' :
            totalScore < 85 ? 'bg-green-500' : 
            'bg-emerald-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${totalScore}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span>Insuffisant</span>
        <span>Moyen</span>
        <span>Bon</span>
        <span>Excellent</span>
      </div>
      <div className="mt-6 text-center text-sm text-gray-600">
        L'évaluation NOVALGO est un outil d'aide à la décision pour améliorer la durabilité des projets de construction.
      </div>
    </motion.div>
  );
};

export default ScoreResult;
