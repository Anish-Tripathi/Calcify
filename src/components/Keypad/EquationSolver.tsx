import React, { useState, useContext } from 'react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { solveLinearEquation, solveQuadraticEquation } from '../../utils/calculations';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Equal } from 'lucide-react';

interface KeypadButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  className?: string;
}

const KeypadButton: React.FC<KeypadButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'default',
  className = '' 
}) => {
  const baseClasses = 'flex items-center justify-center rounded-lg font-medium transition-all duration-100 active:scale-95';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
    primary: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-cyan-600 dark:hover:bg-cyan-700',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const EquationSolver: React.FC = () => {
  const { 
    currentInput, 
    setCurrentInput, 
    displayValue,
    setDisplayValue,
    addToHistory,
    currentMode,
    steps,
    setSteps
  } = useContext(CalculatorContext);
  
  const [equationType, setEquationType] = useState<'linear' | 'quadratic'>('linear');
  
  const handleNumberClick = (num: string) => {
    if (displayValue === '0' || displayValue === 'Error') {
      setDisplayValue(num);
      setCurrentInput(num);
    } else {
      setDisplayValue(displayValue + num);
      setCurrentInput(currentInput + num);
    }
  };
  
  const handleSymbolClick = (symbol: string) => {
    setDisplayValue(displayValue + symbol);
    setCurrentInput(currentInput + symbol);
  };
  
  const handleClearClick = () => {
    setCurrentInput('');
    setDisplayValue('0');
    setSteps([]);
  };
  
  const handleDeleteClick = () => {
    if (displayValue.length === 1 || displayValue === 'Error') {
      setDisplayValue('0');
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
    
    if (currentInput.length === 1) {
      setCurrentInput('');
    } else {
      setCurrentInput(currentInput.slice(0, -1));
    }
  };
  
  const handleSolveClick = () => {
    if (currentInput) {
      try {
        let result;
        let newSteps;
        
        if (equationType === 'linear') {
          const solution = solveLinearEquation(currentInput);
          result = solution.result;
          newSteps = solution.steps;
        } else {
          const solution = solveQuadraticEquation(currentInput);
          result = solution.result;
          newSteps = solution.steps;
        }
        
        setDisplayValue(result);
        setSteps(newSteps);
        
        // Add to history
        addToHistory({
          input: currentInput,
          result,
          mode: currentMode
        });
        
      } catch (error) {
        setDisplayValue('Error');
        setSteps([]);
      }
    }
  };
  
  return (
    <div className="mt-4 space-y-4">
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            equationType === 'linear'
              ? 'bg-blue-500 dark:bg-cyan-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          onClick={() => setEquationType('linear')}
        >
          Linear (ax + b = c)
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            equationType === 'quadratic'
              ? 'bg-blue-500 dark:bg-cyan-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
          onClick={() => setEquationType('quadratic')}
        >
          Quadratic (ax² + bx + c = 0)
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {/* Row 1 */}
        <KeypadButton onClick={handleClearClick} variant="danger">
          C
        </KeypadButton>
        <KeypadButton onClick={handleDeleteClick} variant="secondary">
          ⌫
        </KeypadButton>
        <KeypadButton onClick={() => handleSymbolClick('=')} variant="secondary">
          =
        </KeypadButton>
        <KeypadButton onClick={() => handleSymbolClick('x')} variant="secondary">
          x
        </KeypadButton>
        
        {/* Row 2 */}
        <KeypadButton onClick={() => handleNumberClick('7')}>7</KeypadButton>
        <KeypadButton onClick={() => handleNumberClick('8')}>8</KeypadButton>
        <KeypadButton onClick={() => handleNumberClick('9')}>9</KeypadButton>
        {equationType === 'quadratic' && (
          <KeypadButton onClick={() => handleSymbolClick('²')} variant="secondary">
            x²
          </KeypadButton>
        )}
        {equationType === 'linear' && (
          <KeypadButton onClick={() => handleSymbolClick('+')} variant="secondary">
            +
          </KeypadButton>
        )}
        
        {/* Row 3 */}
        <KeypadButton onClick={() => handleNumberClick('4')}>4</KeypadButton>
        <KeypadButton onClick={() => handleNumberClick('5')}>5</KeypadButton>
        <KeypadButton onClick={() => handleNumberClick('6')}>6</KeypadButton>
        <KeypadButton onClick={() => handleSymbolClick('-')} variant="secondary">
          -
        </KeypadButton>
        
        {/* Row 4 */}
        <KeypadButton onClick={() => handleNumberClick('1')}>1</KeypadButton>
        <KeypadButton onClick={() => handleNumberClick('2')}>2</KeypadButton>
        <KeypadButton onClick={() => handleNumberClick('3')}>3</KeypadButton>
        {equationType === 'quadratic' && (
          <KeypadButton onClick={() => handleSymbolClick('+')} variant="secondary">
            +
          </KeypadButton>
        )}
        {equationType === 'linear' && (
          <KeypadButton onClick={() => handleSymbolClick('*')} variant="secondary">
            ×
          </KeypadButton>
        )}
        
        {/* Row 5 */}
        <KeypadButton onClick={() => handleNumberClick('0')} className="col-span-2">
          0
        </KeypadButton>
        <KeypadButton onClick={() => handleSymbolClick('.')}>.</KeypadButton>
        <KeypadButton onClick={handleSolveClick} variant="primary">
          <Equal size={18} />
        </KeypadButton>
      </div>
      
      {steps.length > 0 && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Solution Steps</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="border-b dark:border-gray-700 pb-2">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {step.explanation}
                </div>
                <SyntaxHighlighter 
                  language="javascript" 
                  style={docco}
                  customStyle={{
                    background: 'transparent',
                    padding: '0.5rem',
                    fontSize: '0.9rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  {step.expression}
                </SyntaxHighlighter>
                {step.result && (
                  <div className="text-right font-medium">
                    = {step.result}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquationSolver;