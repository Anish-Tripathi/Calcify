import React, { useContext } from 'react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { calculate } from '../../utils/calculations';
import { Percent, Delete, Divide, X, Minus, Plus, Equal, Square as SquareRoot, PiSquare as PiSquared } from 'lucide-react';

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
  const baseClasses = 'flex items-center justify-center rounded-lg font-medium text-sm transition-all duration-100 active:scale-95';
  
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

const ScientificKeypad: React.FC = () => {
  const { 
    currentInput, 
    setCurrentInput, 
    displayValue, 
    setDisplayValue,
    addToHistory,
    currentMode
  } = useContext(CalculatorContext);
  
  const handleNumberClick = (num: string) => {
    if (displayValue === '0' || displayValue === 'Error') {
      setDisplayValue(num);
      setCurrentInput(num);
    } else {
      setDisplayValue(displayValue + num);
      setCurrentInput(currentInput + num);
    }
  };
  
  const handleOperatorClick = (operator: string) => {
    // If we already have an operator at the end, replace it
    if (['+', '-', '*', '/', '^'].includes(currentInput.slice(-1))) {
      setCurrentInput(currentInput.slice(0, -1) + operator);
    } else {
      setCurrentInput(currentInput + operator);
      setDisplayValue('0');
    }
  };
  
  const handleDecimalClick = () => {
    // Only add decimal if there isn't one already in the current number
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setCurrentInput(currentInput + '.');
    }
  };
  
  const handleClearClick = () => {
    setCurrentInput('');
    setDisplayValue('0');
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
  
  const handlePercentClick = () => {
    try {
      const value = parseFloat(displayValue) / 100;
      setDisplayValue(value.toString());
      setCurrentInput(currentInput.slice(0, -displayValue.length) + value.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };
  
  const handleEqualsClick = () => {
    if (currentInput) {
      try {
        const result = calculate(currentInput);
        setDisplayValue(result);
        
        // Add to history
        addToHistory({
          input: currentInput,
          result,
          mode: currentMode
        });
        
        // Reset current input
        setCurrentInput(result);
      } catch (error) {
        setDisplayValue('Error');
      }
    }
  };
  
  const handleFunctionClick = (func: string, closeParens = true) => {
    const newInput = func + '(' + (closeParens ? '' : displayValue);
    
    if (displayValue === '0' || displayValue === 'Error') {
      setCurrentInput(newInput);
    } else {
      setCurrentInput(currentInput + newInput);
    }
    
    setDisplayValue('0');
  };
  
  const handleParenthesisClick = (paren: string) => {
    setCurrentInput(currentInput + paren);
    setDisplayValue('0');
  };
  
  const handleConstantClick = (constant: string) => {
    if (displayValue === '0' || displayValue === 'Error') {
      setCurrentInput(constant);
      setDisplayValue(constant);
    } else {
      setCurrentInput(currentInput + constant);
      setDisplayValue(constant);
    }
  };
  
  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3 mt-4">
      {/* Row 1 */}
      <KeypadButton onClick={() => handleFunctionClick('sin')} variant="secondary">
        sin
      </KeypadButton>
      <KeypadButton onClick={() => handleFunctionClick('cos')} variant="secondary">
        cos
      </KeypadButton>
      <KeypadButton onClick={() => handleFunctionClick('tan')} variant="secondary">
        tan
      </KeypadButton>
      <KeypadButton onClick={handleClearClick} variant="danger">
        C
      </KeypadButton>
      <KeypadButton onClick={handleDeleteClick} variant="secondary">
        <Delete size={16} />
      </KeypadButton>
      
      {/* Row 2 */}
      <KeypadButton onClick={() => handleFunctionClick('asin')} variant="secondary">
        sin<sup>-1</sup>
      </KeypadButton>
      <KeypadButton onClick={() => handleFunctionClick('acos')} variant="secondary">
        cos<sup>-1</sup>
      </KeypadButton>
      <KeypadButton onClick={() => handleFunctionClick('atan')} variant="secondary">
        tan<sup>-1</sup>
      </KeypadButton>
      <KeypadButton onClick={() => handleParenthesisClick('(')} variant="secondary">
        (
      </KeypadButton>
      <KeypadButton onClick={() => handleParenthesisClick(')')} variant="secondary">
        )
      </KeypadButton>
      
      {/* Row 3 */}
      <KeypadButton onClick={() => handleFunctionClick('log10')} variant="secondary">
        log
      </KeypadButton>
      <KeypadButton onClick={() => handleFunctionClick('log')} variant="secondary">
        ln
      </KeypadButton>
      <KeypadButton onClick={() => handleOperatorClick('^')} variant="secondary">
        x<sup>y</sup>
      </KeypadButton>
      <KeypadButton onClick={() => handleFunctionClick('sqrt', false)} variant="secondary">
        <SquareRoot size={16} />
      </KeypadButton>
      <KeypadButton onClick={handlePercentClick} variant="secondary">
        <Percent size={16} />
      </KeypadButton>
      
      {/* Row 4 */}
      <KeypadButton onClick={() => handleConstantClick('pi')} variant="secondary">
        <PiSquared size={16} />
      </KeypadButton>
      <KeypadButton onClick={() => handleConstantClick('e')} variant="secondary">
        e
      </KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('7')}>7</KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('8')}>8</KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('9')}>9</KeypadButton>
      
      {/* Row 5 */}
      <KeypadButton onClick={() => handleFunctionClick('factorial')} variant="secondary">
        x!
      </KeypadButton>
      <KeypadButton onClick={() => handleOperatorClick('^2')} variant="secondary">
        x²
      </KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('4')}>4</KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('5')}>5</KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('6')}>6</KeypadButton>
      
      {/* Row 6 */}
      <KeypadButton onClick={() => handleOperatorClick('/')} variant="secondary">
        <Divide size={16} />
      </KeypadButton>
      <KeypadButton onClick={() => handleOperatorClick('*')} variant="secondary">
        <X size={16} />
      </KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('1')}>1</KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('2')}>2</KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('3')}>3</KeypadButton>
      
      {/* Row 7 */}
      <KeypadButton onClick={() => handleOperatorClick('-')} variant="secondary">
        <Minus size={16} />
      </KeypadButton>
      <KeypadButton onClick={() => handleOperatorClick('+')} variant="secondary">
        <Plus size={16} />
      </KeypadButton>
      <KeypadButton onClick={() => handleNumberClick('0')} className="col-span-2">
        0
      </KeypadButton>
      <KeypadButton onClick={handleDecimalClick}>.</KeypadButton>
      
      {/* Row 8 */}
      <KeypadButton onClick={handleEqualsClick} variant="primary" className="col-span-5">
        <Equal size={16} />
      </KeypadButton>
    </div>
  );
};

export default ScientificKeypad;