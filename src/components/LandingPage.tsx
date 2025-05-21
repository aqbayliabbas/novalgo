import React from 'react';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import Header from './Header';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 py-16 px-4 sm:px-8 md:px-16 bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url('/bg.jpg')` }}
      >
        {/* Overlay for contrast */}
        <div
          className="absolute inset-0 bg-black opacity-60 z-0 pointer-events-none"
          aria-hidden="true"
        />
      <Header onGetStarted={onGetStarted} 
      
      />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              NOVALGO <br />
              <span className="text-green-600">Evaluation Des Projets</span>
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Une méthode d’évaluation des bâtiments durables, conçue pour le
              contexte climatique, culturel et économique de l’Algérie.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                style={{ backgroundColor: '#17a34a', borderColor: '#17a34a', color: 'white' }}
              >
                Commencer l'évaluation
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Découvrir la méthode Section */}
      <section className="bg-white py-16 px-4 border-b border-gray-200" id="decouvrir-methode">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Découvrir la méthode</h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
La méthode NOVALGO ambitionne de fournir une réponse concrète aux enjeux climatiques,
énergétiques, environnementaux et sociaux actuels, tout en valorisant les spécificités locales
(matériaux, climat, pratiques constructives traditionnelles). Elle constitue un levier stratégique
pour encourager une architecture plus responsable, performante et contextualisée.
Cette méthode est conçue comme un outil flexible et évolutif, applicable à toutes les phases du
cycle de vie du bâtiment (de la conception à l’exploitation), et compatible avec différents types
de projets (logements, équipements publics, bâtiments tertiaires, etc.).
NOVALGO repose sur une approche multicritère, structurée autour de catégories d’évaluation
inspirées des méthodes internationales existantes (HQE, LEED, BREEAM…), mais adaptées
aux réalités algériennes, sur la base de l’analyse comparative réalisée en amont.
Elle vise à accompagner les acteurs du bâtiment (architectes, ingénieurs, promoteurs,
collectivités locales) dans leurs choix en matière de performance énergétique, gestion des
ressources, confort, et intégration environnementale, avec pour objectif final la réduction de
l’impact écologique des constructions en Algérie.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <div className="bg-gray-50 py-16 px-4" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Notre système d'évaluation</h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">Évaluez vos projets selon 8 critères clés pour une construction durable et responsable.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Keep existing FeatureCard components */}
            <FeatureCard 
              icon="🧱" 
              title="Matériaux" 
              description="Matériaux locaux, à faible impact et gestion des déchets"
            />
            <FeatureCard 
              icon="⚡" 
              title="Énergie" 
              description="Énergies renouvelables, isolation, orientation et ventilation"
            />
            <FeatureCard 
              icon="💧" 
              title="Eau" 
              description="Consommation, eau de pluie et eaux usées"
            />
            <FeatureCard 
              icon="☀️" 
              title="Confort" 
              description="Confort thermique, acoustique et visuel"
            />
            <FeatureCard 
              icon="♻️" 
              title="Déchets" 
              description="Gestion des déchets de construction et d'exploitation"
            />
            <FeatureCard 
              icon="💰" 
              title="Économie" 
              description="Coûts et solutions économiques"
            />
            <FeatureCard 
              icon="🌱" 
              title="Biodiversité" 
              description="Végétation, biodiversité et respect du site"
            />
            <FeatureCard 
              icon="🔒" 
              title="Sécurité" 
              description="Sécurité incendie et accessibilité"
            />
          </div>
        </div>
      </div>
      
      {/* Pourquoi NOVALGO Section */}
      <section className="bg-green-50 py-16 px-4 border-t border-b border-green-100" id="pourquoi-novalgo">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Pourquoi NOVALGO</h2>
          <ul className="text-lg text-gray-800 space-y-3 list-disc list-inside">
            <li>Réduire l’impact environnemental du bâtiment</li>
            <li>Optimiser la performance énergétique</li>
            <li>Améliorer le confort des usagers</li>
            <li>Encourager l’usage de matériaux durables et locaux</li>
            <li>Renforcer la résilience climatique des constructions</li>
            <li>Fournir un outil de gestion adapté aux professionnels algériens</li>
            <li>Mettre en place un label environnemental national</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 NOVALGO Evaluation System. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
