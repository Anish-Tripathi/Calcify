import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Calculator } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Calculator size={24} className="text-blue-600 dark:text-cyan-400 mr-2" />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;