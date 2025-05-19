
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollToResultButtonProps {
  isResultCalculated: boolean;
}

const ScrollToResultButton: React.FC<ScrollToResultButtonProps> = ({ isResultCalculated }) => {
  const scrollToResult = () => {
    const resultElement = document.getElementById('result-section');
    if (resultElement) {
      resultElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If result section doesn't exist yet, scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  if (!isResultCalculated) return null;

  return (
    <button
      onClick={scrollToResult}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 z-10"
      aria-label="Scroll to result"
    >
      <ChevronDown className="h-6 w-6" />
    </button>
  );
};

export default ScrollToResultButton;
