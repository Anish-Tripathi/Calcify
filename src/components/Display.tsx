import React, { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';

interface DisplayProps {
  className?: string;
}

const Display: React.FC<DisplayProps> = ({ className = '' }) => {
  const { currentInput, displayValue } = useContext(CalculatorContext);
  
  return (
    <div className={`w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner ${className}`}>
      <div className="flex flex-col">
        <div className="text-gray-500 dark:text-gray-400 text-right text-lg font-medium h-7 overflow-x-auto whitespace-nowrap mb-1">
          {currentInput}
        </div>
        <div className="text-3xl md:text-4xl font-semibold text-right overflow-x-auto whitespace-nowrap">
          {displayValue}
        </div>
      </div>
    </div>
  );
};

export default Display;