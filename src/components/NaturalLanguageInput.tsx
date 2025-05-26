import React, { useState, useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { parseNaturalLanguage, calculate } from '../utils/calculations';
import { Sparkles, Send } from 'lucide-react';

const NaturalLanguageInput: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const { 
    setCurrentInput, 
    setDisplayValue, 
    addToHistory,
    currentMode
  } = useContext(CalculatorContext);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    try {
      // Parse the natural language input
      const parsedInput = parseNaturalLanguage(input);
      
      // Set the current input for the calculator
      setCurrentInput(parsedInput);
      
      // If it's a calculation (not an equation), calculate the result
      if (!parsedInput.includes('=')) {
        const result = calculate(parsedInput);
        setDisplayValue(result);
        
        // Add to history
        addToHistory({
          input: input,
          result,
          mode: currentMode
        });
      }
      
      // Clear the input field
      setInput('');
      
    } catch (error) {
      console.error('Natural language parsing error:', error);
      setDisplayValue('Error');
    }
  };
  
  const examples = [
    "What is 25% of 80?",
    "sqrt of 144",
    "15 + 3 * 4",
    "Solve x^2 - 5x + 6 = 0",
    "Convert 5 miles to km"
  ];
  
  const handleExampleClick = (example: string) => {
    setInput(example);
  };
  
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex">
          <div className="relative flex-grow">
            <Sparkles 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
            />
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a calculation or question..."
              className="w-full pl-9 pr-12 py-2.5 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="ml-2 px-4 py-2.5 bg-blue-500 dark:bg-cyan-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 focus:ring-offset-2"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(example)}
            className="text-xs px-2.5 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NaturalLanguageInput;