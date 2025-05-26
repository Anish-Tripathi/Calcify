import React, { useContext, useState } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { ThemeContext } from '../context/ThemeContext';
import { Clock, X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const History: React.FC = () => {
  const { history, clearHistory, setCurrentInput, setDisplayValue } = useContext(CalculatorContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const toggleHistory = () => {
    setIsOpen(!isOpen);
  };
  
  const useCalculation = (input: string, result: string) => {
    setCurrentInput(result);
    setDisplayValue(result);
  };
  
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (history.length === 0) {
    return (
      <div className="mt-6">
        <button
          onClick={toggleHistory}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <Clock size={16} className="mr-1" />
          <span>No calculation history</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <button
        onClick={toggleHistory}
        className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Clock size={16} className="mr-1" />
        <span>History</span>
        {isOpen ? (
          <ChevronUp size={16} className="ml-1" />
        ) : (
          <ChevronDown size={16} className="ml-1" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-md max-h-80 overflow-y-auto">
          <div className="p-3 flex justify-between items-center border-b dark:border-gray-700">
            <h3 className="text-sm font-medium">Calculation History</h3>
            <button 
              onClick={clearHistory}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((item) => (
              <li 
                key={item.id} 
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => useCalculation(item.input, item.result)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatDateTime(item.timestamp)} • {item.mode}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.input}
                    </div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      = {item.result}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default History;