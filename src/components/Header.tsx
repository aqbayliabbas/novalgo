
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from './ui/navigation-menu';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onGetStarted?: () => void;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted, onBack }) => {
  return (
    <header className="py-4 px-4 md:px-8 w-full border-b border-gray-100 bg-white relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        {/* Back Arrow at far left */}
        {onBack && (
          <motion.button
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.15, rotate: -10 }}
            whileTap={{ scale: 0.95, rotate: -20 }}
            onClick={onBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Retour"
            type="button"
            style={{ zIndex: 2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        )}
        {/* Centered Logo and App Name */}
        <motion.div
          className="flex flex-col items-center justify-center w-full"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
          <div className="flex items-center gap-3 justify-center">
            <motion.img
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              src="/logo.PNG"
              alt="NOVALGO Logo"
              className="w-10 h-10 object-contain rounded-lg shadow"
            />
            <motion.h1
              className="text-xl font-bold text-gray-800 hidden sm:block"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              NOVALGO
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </header>

  );
};

export default Header;
