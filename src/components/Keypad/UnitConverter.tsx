import React, { useState, useContext } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { ArrowRightLeft } from "lucide-react";
import {
  unitCategories,
  findUnitById,
  convertUnitValue,
  UnitCategory,
} from "../../utils/unitConversions";

const UnitConverter: React.FC = () => {
  const { addToHistory, currentMode } = useContext(CalculatorContext);

  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(
    unitCategories[0]
  );
  const [fromUnitId, setFromUnitId] = useState<string>(
    selectedCategory.units[0].id
  );
  const [toUnitId, setToUnitId] = useState<string>(
    selectedCategory.units[1].id
  );
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("");
  const [conversionError, setConversionError] = useState<string>("");

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = unitCategories.find((cat) => cat.id === categoryId);
    if (newCategory) {
      setSelectedCategory(newCategory);
      setFromUnitId(newCategory.units[0].id);
      setToUnitId(newCategory.units[1].id);
      // Reset values
      setFromValue("1");
      setToValue("");
      setConversionError("");
    }
  };

  const handleFromUnitChange = (unitId: string) => {
    setFromUnitId(unitId);
    if (fromValue) {
      performConversion(fromValue, unitId, toUnitId);
    }
  };

  const handleToUnitChange = (unitId: string) => {
    setToUnitId(unitId);
    if (fromValue) {
      performConversion(fromValue, fromUnitId, unitId);
    }
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);

    if (value === "") {
      setToValue("");
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      performConversion(value, fromUnitId, toUnitId);
    }
  };

  const performConversion = (value: string, from: string, to: string) => {
    try {
      setConversionError("");

      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setToValue("");
        return;
      }

      const result = convertUnitValue(numValue, from, to);

      // Format the result based on the magnitude
      let formattedResult: string;
      if (Math.abs(result) < 0.0001 || Math.abs(result) >= 10000) {
        formattedResult = result.toExponential(6);
      } else {
        formattedResult = result.toPrecision(6).replace(/\.?0+$/, "");
      }

      setToValue(formattedResult);

      // Add to history
      const fromUnit = findUnitById(from);
      const toUnit = findUnitById(to);

      if (fromUnit && toUnit) {
        const historyInput = `${value} ${fromUnit.symbol} to ${toUnit.symbol}`;
        const historyResult = `${formattedResult} ${toUnit.symbol}`;

        addToHistory({
          input: historyInput,
          result: historyResult,
          mode: currentMode,
        });
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setToValue("");
      setConversionError("Cannot convert between these units");
    }
  };

  const swapUnits = () => {
    const tempUnitId = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(tempUnitId);

    // Also swap values
    const tempValue = fromValue;
    setFromValue(toValue || "0");

    if (tempValue) {
      performConversion(toValue || "0", toUnitId, tempUnitId);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {unitCategories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedCategory.id === category.id
                ? "bg-blue-500 dark:bg-cyan-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {/* From Unit */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              From:
            </label>
            <select
              value={fromUnitId}
              onChange={(e) => handleFromUnitChange(e.target.value)}
              className="text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            value={fromValue}
            onChange={(e) => handleFromValueChange(e.target.value)}
            placeholder="Enter value"
            className="w-full p-2 text-lg text-right bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowRightLeft size={20} />
          </button>
        </div>

        {/* To Unit */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              To:
            </label>
            <select
              value={toUnitId}
              onChange={(e) => handleToUnitChange(e.target.value)}
              className="text-sm bg-gray-100 dark:bg-gray-700 border-none rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
            >
              {selectedCategory.units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={toValue}
            readOnly
            placeholder="Result"
            className="w-full p-2 text-lg text-right bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {conversionError && (
        <div className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
          {conversionError}
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
