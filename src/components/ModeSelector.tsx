import React, { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { Calculator, FunctionSquare as Function, ArrowRightLeft, Binary } from 'lucide-react';
import { CalculationMode } from '../types';

interface ModeSelectorProps {
  className?: string;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ className = '' }) => {
  const { currentMode, setCurrentMode } = useContext(CalculatorContext);

  const modes: { id: CalculationMode; name: string; icon: React.ReactNode }[] = [
    { 
      id: 'standard', 
      name: 'Standard', 
      icon: <Calculator size={18} />
    },
    { 
      id: 'scientific', 
      name: 'Scientific', 
      icon: <Function size={18} />
    },
    { 
      id: 'equation', 
      name: 'Equation', 
      icon: <Binary size={18} />
    },
    { 
      id: 'unit', 
      name: 'Unit Conv.', 
      icon: <ArrowRightLeft size={18} />
    }
  ];

  return (
    <div className={`flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 ${className}`}>
      {modes.map((mode) => (
        <button
          key={mode.id}
          className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            currentMode === mode.id
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-cyan-400 shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => setCurrentMode(mode.id)}
        >
          <span className="mr-1.5">{mode.icon}</span>
          <span className="hidden sm:inline">{mode.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;