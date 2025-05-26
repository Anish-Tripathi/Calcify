export type CalculationMode = 'standard' | 'scientific' | 'equation' | 'unit';

export interface Calculation {
  id: string;
  input: string;
  result: string;
  timestamp: number;
  mode: CalculationMode;
}

export interface MemoryValue {
  id: string;
  value: number;
  label?: string;
}

export interface CalculationStep {
  expression: string;
  result: string;
  explanation: string;
}

export interface UnitConversion {
  from: string;
  to: string;
  value: number;
  result: number;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface CalculatorContextType {
  currentInput: string;
  setCurrentInput: (input: string) => void;
  displayValue: string;
  setDisplayValue: (value: string) => void;
  history: Calculation[];
  addToHistory: (calculation: Omit<Calculation, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  memory: MemoryValue[];
  addToMemory: (value: number, label?: string) => void;
  clearMemory: () => void;
  getFromMemory: (id: string) => number | null;
  removeFromMemory: (id: string) => void;
  currentMode: CalculationMode;
  setCurrentMode: (mode: CalculationMode) => void;
  steps: CalculationStep[];
  setSteps: (steps: CalculationStep[]) => void;
}