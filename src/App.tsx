import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CalculatorProvider } from './context/CalculatorContext';
import Header from './components/Header';
import Display from './components/Display';
import ModeSelector from './components/ModeSelector';
import Keypad from './components/Keypad';
import NaturalLanguageInput from './components/NaturalLanguageInput';
import History from './components/History';

function App() {
  return (
    <ThemeProvider>
      <CalculatorProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
          <div className="container mx-auto max-w-md px-4 py-6">
            <Header title="Smart Calculator" />
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 transition-all duration-200">
              <Display className="mb-4" />
              <ModeSelector className="mb-4" />
              <Keypad />
              <NaturalLanguageInput />
              <History />
            </div>
            
            <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>© 2025 Smart Calculator. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </CalculatorProvider>
    </ThemeProvider>
  );
}

export default App;