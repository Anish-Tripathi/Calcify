import React, { createContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  CalculatorContextType,
  Calculation,
  MemoryValue,
  CalculationMode,
  CalculationStep
} from '../types';

export const CalculatorContext = createContext<CalculatorContextType>({
  currentInput: '',
  setCurrentInput: () => {},
  displayValue: '0',
  setDisplayValue: () => {},
  history: [],
  addToHistory: () => {},
  clearHistory: () => {},
  memory: [],
  addToMemory: () => {},
  clearMemory: () => {},
  getFromMemory: () => null,
  removeFromMemory: () => {},
  currentMode: 'standard',
  setCurrentMode: () => {},
  steps: [],
  setSteps: () => {},
});

interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [history, setHistory] = useState<Calculation[]>([]);
  const [memory, setMemory] = useState<MemoryValue[]>([]);
  const [currentMode, setCurrentMode] = useState<CalculationMode>('standard');
  const [steps, setSteps] = useState<CalculationStep[]>([]);

  const addToHistory = (calculation: Omit<Calculation, 'id' | 'timestamp'>) => {
    const newCalculation: Calculation = {
      ...calculation,
      id: uuidv4(),
      timestamp: Date.now()
    };
    setHistory(prev => [newCalculation, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const addToMemory = (value: number, label?: string) => {
    const newMemoryValue: MemoryValue = {
      id: uuidv4(),
      value,
      label
    };
    setMemory(prev => [newMemoryValue, ...prev]);
  };

  const getFromMemory = (id: string): number | null => {
    const memoryValue = memory.find(item => item.id === id);
    return memoryValue ? memoryValue.value : null;
  };

  const removeFromMemory = (id: string) => {
    setMemory(prev => prev.filter(item => item.id !== id));
  };

  const clearMemory = () => {
    setMemory([]);
  };

  return (
    <CalculatorContext.Provider
      value={{
        currentInput,
        setCurrentInput,
        displayValue,
        setDisplayValue,
        history,
        addToHistory,
        clearHistory,
        memory,
        addToMemory,
        clearMemory,
        getFromMemory,
        removeFromMemory,
        currentMode,
        setCurrentMode,
        steps,
        setSteps,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};