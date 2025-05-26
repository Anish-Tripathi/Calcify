import React, { useContext } from 'react';
import { CalculatorContext } from '../../context/CalculatorContext';
import StandardKeypad from './StandardKeypad';
import ScientificKeypad from './ScientificKeypad';
import EquationSolver from './EquationSolver';
import UnitConverter from './UnitConverter';

const Keypad: React.FC = () => {
  const { currentMode } = useContext(CalculatorContext);
  
  return (
    <div>
      {currentMode === 'standard' && <StandardKeypad />}
      {currentMode === 'scientific' && <ScientificKeypad />}
      {currentMode === 'equation' && <EquationSolver />}
      {currentMode === 'unit' && <UnitConverter />}
    </div>
  );
};

export default Keypad;